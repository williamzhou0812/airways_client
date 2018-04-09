import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './Features.css';

class Features extends Component {
    render() {
        return (
            <div
                className="main-section-animation"
                style={{ backgroundColor: 'orange' }}
            >
                <p>Features</p>
            </div>
        );
    }
}

export default connect(null, actions)(Features);
