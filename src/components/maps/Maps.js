import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './Maps.css';
import _ from 'lodash';
import { createImageURL } from '../utils/Constants';

class Maps extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.mapsList.maps);
    }

    render() {
        const { mapsList } = this.props;

        return (
            <div className="main-section-animation">
                <div className="map--container">
                    <div className="mapitem mapitem--image">
                        <img
                            src={createImageURL(mapsList.maps[0].images_path)}
                            width="880"
                            alt="header"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ mapsList }) {
    return { mapsList };
}

export default connect(mapStateToProps, actions)(Maps);
