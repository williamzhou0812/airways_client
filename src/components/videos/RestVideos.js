import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import _ from 'lodash';
import { createImageURL } from '../utils/Constants';
import './RestVideos.css';

class RestVideos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reload: false
        };
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
                            autoplay="autoplay"
                            loop="loop"
                            style={{ width: '1080px' }}
                            onEnded={() => {
                                console.log('end');
                                this.setState({ reload: true }, () => {
                                    this.forceUpdate();
                                });
                            }}
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

function mapStateToProps({ videosList }) {
    return { videosList };
}

export default connect(mapStateToProps, actions)(RestVideos);
