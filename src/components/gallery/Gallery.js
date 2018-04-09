import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './Gallery.css';

class Gallery extends Component {
    render() {
        return (
            <div
                className="main-section-animation"
                style={{ backgroundColor: 'green' }}
            >
                <p>Gallery</p>
            </div>
        );
    }
}

export default connect(null, actions)(Gallery);
