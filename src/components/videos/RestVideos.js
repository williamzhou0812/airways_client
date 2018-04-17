import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import _ from 'lodash';
import { createImageURL } from '../utils/Constants';
import './RestVideos.css';

class RestVideos extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { restVideoCurrentTime } = this.props;
        if (!_.isEmpty(restVideoCurrentTime)) {
            this.refs.restVideo.currentTime = restVideoCurrentTime.currentTime;
        }
    }

    componentWillUnmount() {
        this.props.setCurrentTime(this.refs.restVideo.currentTime);
    }

    render() {
        const { videosList } = this.props;
        if (!_.isEmpty(videosList.videos[0].video_path)) {
            return (
                <div className="restvideoContainer home-section-animation">
                    <div className="restvideoItem restvideoItem--video">
                        <video
                            ref="restVideo"
                            src={createImageURL(
                                videosList.videos[0].video_path
                            )}
                            type="video/mp4"
                            autoPlay
                            loop="loop"
                            preload="none"
                            style={{ width: '1080px' }}
                        />
                    </div>
                    <div className="restvideoItem restvideoItem--promotion">
                        STATIC PROMOTION SPACE
                    </div>
                </div>
            );
        } else {
            <div>loading</div>;
        }
    }
}

function mapStateToProps({ videosList, restVideoCurrentTime }) {
    return { videosList, restVideoCurrentTime };
}

export default connect(mapStateToProps, actions)(RestVideos);
