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

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getApartmentList();
        this.props.getFeatureList();
        this.props.getGalleryList();
        this.props.getMapList();
    }

    render() {
        let sidebarText = 'APARTMENTS';
        if (!_.isEmpty(this.props.router.location)) {
            if (this.props.router.location.pathname === '/') {
                sidebarText = 'APARTMENTS';
            } else {
                sidebarText = this.props.router.location.pathname.split('/')[1];
            }
        }

        if (
            this.props.apartmentsList.status !== 200 ||
            this.props.galleryList.status !== 200 ||
            this.props.mapsList.status !== 200 ||
            this.props.featuresList.status !== 200
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
            <Router history={this.props.history}>
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

                    <div className="section section--sidebar">
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
                        <Route exact path="/features" component={Features} />
                        <Route exact path="/gallery" component={Gallery} />
                        <Route exact path="/maps" component={Maps} />
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
            </Router>
        );
    }
}

function mapStateToProps({
    apartmentsList,
    featuresList,
    galleryList,
    mapsList,
    router
}) {
    return { apartmentsList, featuresList, galleryList, mapsList, router };
}

export default connect(mapStateToProps, actions)(App);
