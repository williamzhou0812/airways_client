import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './Maps.css';

class Maps extends Component {
    render() {
        return (
            <div
                className="main-section-animation"
                style={{ backgroundColor: 'blue' }}
            >
                <p>Maps</p>
            </div>
        );
    }
}

export default connect(null, actions)(Maps);
