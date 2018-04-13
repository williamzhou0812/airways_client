import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './Maps.css';
import _ from 'lodash';
import { createImageURL } from '../utils/Constants';
import ReactImageMagnify from 'react-image-magnify';

class Maps extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.mapsList.maps);
    }

    render() {
        const { mapsList } = this.props;
        const width = document.documentElement.clientWidth * 0.75; //75vw width
        const height = document.documentElement.clientHeight;
        return (
            <div className="main-section-animation">
                <div className="map--container">
                    <div className="mapitem mapitem--image">
                        <ReactImageMagnify
                            largeImage={{
                                src: createImageURL(
                                    mapsList.maps[0].images_path
                                ),
                                width: 2 * width,
                                height: 2 * height
                            }}
                            smallImage={{
                                src: createImageURL(
                                    mapsList.maps[0].images_path
                                ),
                                width: width,
                                height: height
                            }}
                            isActivatedOnTouch={true}
                            enlargedImagePosition="over"
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
