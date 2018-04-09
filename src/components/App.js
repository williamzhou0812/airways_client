import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter as Router } from 'react-router-redux';
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../actions';
import './App.css';
import Header from './header/Header';
import Footer from './footer/Footer';
import Menu from './menu/Menu';
import ReactLoading from 'react-loading';
import Apartments from './apartments/Apartments';
import Features from './features/Features';
import Gallery from './gallery/Gallery';
import Maps from './maps/Maps';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('123');
        this.props.getApartmentList();
        this.props.getFeatureList();
        this.props.getGalleryList();
        this.props.getMapList();
    }

    render() {
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
                    <Switch>
                        <Route exact path="/" component={Apartments} />
                        <Route
                            exact
                            path="/apartments"
                            component={Apartments}
                        />
                        <Route exact path="/features" component={Features} />
                        <Route exact path="/gallery" component={Gallery} />
                        <Route exact path="/maps" component={Maps} />
                        <Redirect from="/" to="/apartments" />
                    </Switch>
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
    mapsList
}) {
    return { apartmentsList, featuresList, galleryList, mapsList };
}

export default connect(mapStateToProps, actions)(App);
