import React, { Component } from 'react';
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
        const { navigateTo } = this.props;

        return (
            <div className="header">
                <div
                    className="headerItem headerItem--logo"
                    onClick={() => {
                        navigateTo('/');
                    }}
                >
                    <img
                        src={require(`../../images/header.png`)}
                        width="1080"
                        alt="header"
                    />
                </div>
                <div className="headerItem headerItem--welcome">
                    <p>WELCOME TO AIRWAYS RESIDENCES</p>
                </div>
                <div className="headerItem headerItem--time">
                    <p>{time}</p>
                </div>
                <div className="headerItem headerItem--date">
                    <p>{date}</p>
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(Header);
