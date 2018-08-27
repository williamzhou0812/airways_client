import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import _ from "lodash";
import { createImageURL } from "../utils/Constants";
import "./RestVideos.css";
import ImageGallery from "react-image-gallery";

class RestVideos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false
        };

        setTimeout(
            function() {
                if (!this.state.status) {
                    this.setState({ status: true });
                }
            }.bind(this),
            180000
        );
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

    processImageList(promotion) {
        let images = [];
        promotion.forEach(each => {
            images.push({
                original: createImageURL(each.images_path)
            });
        });
        return images;
    }

    render() {
        const { videosList, promotionList } = this.props;

        let promotionImage;
        if (!_.isEmpty(videosList.videos[0].video_path)) {
            if (!_.isEmpty(promotionList.promotion)) {
                promotionImage = this.processImageList(promotionList.promotion);
            }
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
                            preload="none"
                            loop="loop"
                            style={{ width: "1080px" }}
                        />
                    </div>
                    <div className="restvideoItem restvideoItem--promotion">
                        {!_.isEmpty(promotionImage) ? (
                            <ImageGallery
                                items={promotionImage}
                                autoPlay={true}
                                showPlayButton={false}
                                showFullscreenButton={false}
                                slideDuration={2000}
                                slideInterval={5000}
                                showThumbnails={false}
                                showNav={false}
                                renderItem={item => {
                                    return (
                                        <div>
                                            <img
                                                src={item.original}
                                                srcSet={item.srcSet}
                                                style={{
                                                    width: "1080px",
                                                    height: "760px"
                                                }}
                                                alt={item.original}
                                            />
                                        </div>
                                    );
                                }}
                            />
                        ) : (
                            <p
                                style={{
                                    textAlign: "center",
                                    fontSize: "60px"
                                }}
                            >
                                STATIC PROMOTION SPACE
                            </p>
                        )}
                    </div>
                </div>
            );
        } else {
            return <div>loading</div>;
        }
    }
}

function mapStateToProps({ videosList, restVideoCurrentTime, promotionList }) {
    return { videosList, restVideoCurrentTime, promotionList };
}

export default connect(
    mapStateToProps,
    actions
)(RestVideos);
