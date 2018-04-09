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

import Apartments from './apartments/Apartments';
import Features from './features/Features';
import Gallery from './gallery/Gallery';
import Maps from './maps/Maps';

class App extends Component {
    /*render() {
        return (
            <div className="container">
                <div className="section section--header">
                    <Header />
                </div>
                <div className="section section--breakline" />
                <div className="section section--menu">
                    <Menu />
                </div>
                <div className="section section--main">Main</div>
                <div className="section section--footer">
                    <Footer />
                </div>
            </div>
        );
    }*/
    render() {
        return (
            <Router history={this.props.history}>
                <div className="container">
                    <div className="section section--header">
                        <Header />
                    </div>
                    <div className="section section--breakline" />
                    <div className="section section--menu">
                        <Menu />
                    </div>
                    <Switch>
                        <Route exact path="/" component={Apartments} />
                        <Route path="/apartments" component={Apartments} />
                        <Route path="/features" component={Features} />
                        <Route path="/gallery" component={Gallery} />
                        <Route path="/maps" component={Maps} />
                    </Switch>
                    <div className="section section--footer">
                        <Footer />
                    </div>
                </div>
            </Router>
        );
    }
}

function mapStateToProps({}) {
    return {};
}

export default connect(mapStateToProps, actions)(App);
