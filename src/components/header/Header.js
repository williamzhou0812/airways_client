import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter as Router } from 'react-router-redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import moment from 'moment-timezone';

import './Header.css';

class Header extends Component {
    intervalID;
    constructor(props) {
        super(props);
        this.state = {
            time: '',
            date: ''
        };
    }
    setDatetime() {
        this.setState({
            time: moment()
                .tz('Pacific/Port_Moresby')
                .format('HH:mm A'),
            date: moment()
                .tz('Pacific/Port_Moresby')
                .format('DD MMMM YYYY')
                .toUpperCase()
        });
    }
    componentDidMount() {
        this.setDatetime();
        this.intervalID = window.setInterval(
            function() {
                this.setDatetime();
            }.bind(this),
            1000
        );
    }

    componentWillUnmount() {
        window.clearInterval(this.intervalID);
    }

    render() {
        const { time, date } = this.state;

        return (
            <div className="header">
                <div className="header header--logo">
                    <img
                        src={require(`../../images/header.png`)}
                        width="1080"
                    />
                </div>
                <div className="header header--welcome">
                    <p className="header--welcome--text">
                        WELCOME TO AIRWAYS RESIDENCES
                    </p>
                </div>
                <div className="header header--time">
                    <p className="header--time--text">{time}</p>
                </div>
                <div className="header header--date">
                    <p className="header--date--text">{date}</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps({}) {
    return {};
}

export default connect(mapStateToProps, actions)(Header);
