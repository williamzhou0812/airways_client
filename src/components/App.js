import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter as Router } from 'react-router-redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './App.css';
import Header from './header/Header';
import Footer from './footer/Footer';
import Menu from './menu/Menu';
import ReactLoading from 'react-loading';
import Apartments from './apartments/Apartments';
import ApartmentDetail from './apartments/ApartmentDetail';
import Features from './features/Features';
import Gallery from './gallery/Gallery';
import Maps from './maps/Maps';
import _ from 'lodash';
import FeatureDetail from './features/FeatureDetail';
import idleJs from 'idle-js';
import { IDLE_TIME } from './utils/Constants.js';
import RestVideo from './videos/RestVideos';
import Around from './around/Around';

class App extends Component {
    idleRef;

    constructor(props) {
        super(props);
        this.state = {
            isIdle: false
        };
        this.setIdleTrue = this.setIdleTrue.bind(this);
        this.setIdleFalse = this.setIdleFalse.bind(this);
    }

    componentDidMount() {
        this.idleRef = new idleJs({
            idle: IDLE_TIME,
            onIdle: this.setIdleTrue,
            onActive: () => {
                this.setIdleFalse();
            }
        }).start();

        this.props.getApartmentList();
        this.props.getFeatureList();
        this.props.getGalleryList();
        this.props.getMapList();
        this.props.getVideoList();
        this.props.getPromotionList();
        this.props.getSectionList();
        this.props.getDirectoryDisplayList();
    }

    componentWillUnmount() {
        this.idleRef = null;
    }

    setIdleTrue() {
        this.setState({
            isIdle: true
        });
    }

    setIdleFalse() {
        this.setState({
            isIdle: false
        });
    }

    render() {
        const { isIdle } = this.state;
        const {
            apartmentsList,
            mapsList,
            galleryList,
            featuresList,
            videosList,
            router,
            history,
            directoryDisplayList,
            sectionList
        } = this.props;

        let sidebarText = 'APARTMENTS';
        if (!_.isEmpty(router.location)) {
            if (router.location.pathname === '/') {
                sidebarText = 'APARTMENTS';
            } else {
                sidebarText = router.location.pathname.split('/')[1];
            }
        }

        if (
            apartmentsList.status !== 200 ||
            galleryList.status !== 200 ||
            mapsList.status !== 200 ||
            featuresList.status !== 200 ||
            directoryDisplayList.status !== 200 ||
            sectionList.status !== 200 ||
            videosList.status !== 200
        ) {
            return (
                <div className="loadingContainer">
                    <div className="loading ">
                        <p className="loading--title">Initialising</p>
                        <ReactLoading
                            className="loadingAnimation"
                            type={'bubbles'}
                            color={'#b9dfe3'}
                            height="900"
                            width="393"
                            delay={0}
                        />
                    </div>
                </div>
            );
        }
        return (
            <Router history={history}>
                {!isIdle ? (
                    <div className="container home-section-animation">
                        <div className="section section--header">
                            <Header />
                        </div>
                        <div className="section section--breakline" />
                        <div className="section section--menu">
                            <Menu />
                        </div>
                        <img
                            className="menu--shadow"
                            src={require(`../images/Button-Shadow.png`)}
                            alt="sidebar_logo"
                            width="1080"
                        />
                        <div className="section section--sidebar ">
                            <p>{sidebarText}</p>
                        </div>
                        <Switch>
                            <Route exact path="/" component={Apartments} />
                            <Route
                                exact
                                path="/apartments"
                                component={Apartments}
                            />
                            <Route
                                exact
                                path="/apartments/:id"
                                component={ApartmentDetail}
                            />
                            <Route
                                exact
                                path="/features"
                                component={Features}
                            />
                            <Route
                                exact
                                path="/features/:id"
                                component={FeatureDetail}
                            />
                            <Route exact path="/gallery" component={Gallery} />
                            <Route exact path="/around" component={Around} />
                            <Redirect from="/" to="/apartments" />
                        </Switch>
                        <img
                            className="sidebar--logo"
                            src={require(`../images/sidebar_logo.png`)}
                            alt="sidebar_logo"
                            width="260"
                        />
                        <div className="section section--footer">
                            <Footer />
                        </div>
                    </div>
                ) : (
                    <div className="container home-section-animation">
                        <div className="section section--header">
                            <Header />
                        </div>
                        <div className="section section--breakline" />
                        <div className="section section--menu">
                            <Menu />
                        </div>
                        <img
                            className="menu--shadow"
                            src={require(`../images/Button-Shadow.png`)}
                            alt="sidebar_logo"
                            width="1080"
                        />
                        <RestVideo />
                        <div className="section section--footer">
                            <Footer />
                        </div>
                    </div>
                )}
            </Router>
        );
    }
}

function mapStateToProps({
    apartmentsList,
    featuresList,
    galleryList,
    mapsList,
    videosList,
    directoryDisplayList,
    sectionList,
    router
}) {
    return {
        apartmentsList,
        featuresList,
        galleryList,
        mapsList,
        videosList,
        directoryDisplayList,
        sectionList,
        router
    };
}

export default connect(mapStateToProps, actions)(App);
