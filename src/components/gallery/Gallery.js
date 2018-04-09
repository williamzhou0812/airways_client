import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Gallery extends Component {
    render() {
        return (
            <div>
                <p>Gallery</p>
            </div>
        );
    }
}

export default connect(null, actions)(Gallery);
