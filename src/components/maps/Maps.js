import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Maps extends Component {
    render() {
        return (
            <div>
                <p>Maps</p>
            </div>
        );
    }
}

export default connect(null, actions)(Maps);
