import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './Maps.css';
import { createImageURL } from '../utils/Constants';
import ReactImageMagnify from 'react-image-magnify';

class Maps extends Component {
    render() {
        const { mapsList } = this.props;
        const width = 880;
        const height = 500;
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
