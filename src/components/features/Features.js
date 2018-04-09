import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './Features.css';

class Features extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.featuresList.features);
    }

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

function mapStateToProps({ featuresList }) {
    return { featuresList };
}

export default connect(mapStateToProps, actions)(Features);
