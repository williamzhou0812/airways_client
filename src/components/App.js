import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter as Router } from 'react-router-redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './App.css';
import Header from './header/Header';

class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="section section--header">
                    <Header />
                </div>
                <div className="section section--menu">Menu</div>
                <div className="section section--main">Main</div>
                <div className="section section--footer">Footer</div>
            </div>
        );
    }
}

function mapStateToProps({}) {
    return {};
}

export default connect(mapStateToProps, actions)(App);
