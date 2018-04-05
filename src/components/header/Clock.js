import React from 'react';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Clock extends React.Component {
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
                .format('HH:mm'),
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
            <div>
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

function mapStateToProps({ windowSize }) {
    return { windowSize };
}

export default connect(mapStateToProps, actions)(Clock);
