import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './Maps.css';

class Maps extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.mapsList.maps);
    }

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

function mapStateToProps({ mapsList }) {
    return { mapsList };
}

export default connect(mapStateToProps, actions)(Maps);
