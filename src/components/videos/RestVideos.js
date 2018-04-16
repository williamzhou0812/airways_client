import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import _ from 'lodash';
import { createImageURL } from '../utils/Constants';
import './RestVideos.css';

class RestVideos extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {}

    render() {
        const { videosList } = this.props;
        if (!_.isEmpty(videosList.videos[0].video_path)) {
            return (
                <div className="restvideoContainer home-section-animation">
                    <div className="restvideoItem restvideoItem--video">
                        <video
                            src={createImageURL(
                                videosList.videos[0].video_path
                            )}
                            type="video/mp4"
                            autoPlay
                            style={{ width: '1080px' }}
                        />
                    </div>
                    <div className="restvideoItem restvideoItem--promotion">
                        PROMOTION
                    </div>
                </div>
            );
        } else {
            <div>loading</div>;
        }
    }
}

function mapStateToProps({ videosList }) {
    return { videosList };
}

export default connect(mapStateToProps, actions)(RestVideos);
