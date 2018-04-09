import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Features extends Component {
    render() {
        return (
            <div>
                <p>Features</p>
            </div>
        );
    }
}

export default connect(null, actions)(Features);
