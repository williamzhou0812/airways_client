import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './Apartments.css';

class Apartments extends Component {
    render() {
        return (
            <div
                className="main-section-animation"
                style={{ backgroundColor: 'red' }}
            >
                <p>Apartments</p>
            </div>
        );
    }
}

export default connect(null, actions)(Apartments);
