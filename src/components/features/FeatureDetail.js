import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './FeatureDetail.css';
import _ from 'lodash';
import { createImageURL } from '../utils/Constants';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import RightIcon from 'material-ui/svg-icons/navigation/chevron-right';
import ImageGallery from 'react-image-gallery';

class FeatureDetail extends Component {
    constructor(props) {
        super(props);
        this.props.getSelectedFeatureDetail(
            this.props.match.params.id,
            this.props.featuresList.features
        );
        this.state = {
            up: false,
            down: false
        };
    }

    componentDidMount() {
        this.props.getSelectedFeatureDetail(
            this.props.match.params.id,
            this.props.featuresList.features
        );
    }

    processImageList(feature) {
        let images = [];
        feature.images_path.forEach(each => {
            images.push({
                original: createImageURL(each),
                thumbnail: createImageURL(each)
            });
        });
        return images;
    }

    processNextFeatureID(action) {
        const { featureDetail, featuresList } = this.props;
        let nextID;
        if (action === 'up') {
            if (featureDetail.feature.id == featuresList.features.length) {
                nextID = 1;
            } else {
                nextID = parseInt(featureDetail.feature.id) + 1;
            }
        }

        if (action === 'down') {
            if (featureDetail.feature.id == 1) {
                nextID = featuresList.features.length;
            } else {
                nextID = parseInt(featureDetail.feature.id) - 1;
            }
        }
        return nextID;
    }

    resetAnimationClass() {
        document
            .getElementById('featureDetailSection')
            .classList.remove('main-section-animation');
        document
            .getElementById('featureDetailSection')
            .classList.remove('section-down-animation');
        document
            .getElementById('featureDetailSection')
            .classList.remove('section-up-animation');
    }

    render() {
        const { up, down } = this.state;
        const { navigateTo, featuresList } = this.props;
        const { feature } = this.props.featureDetail;

        if (!_.isEmpty(this.props.featureDetail)) {
            const images = this.processImageList(feature);
            return (
                <div
                    className="feature--detail--container main-section-animation"
                    id="featureDetailSection"
                >
                    <div
                        className={
                            up
                                ? 'featuredetail featuredetail--up--arrow featuredetail--click'
                                : 'featuredetail featuredetail--up--arrow featuredetail--clicked'
                        }
                        onClick={() => {
                            {
                                /*FOR ARROW BUTTON ANIMATION PURPOSE ONLY*/
                            }
                            /*this.setState({ up: true }, () => {
                                setTimeout(() => {
                                    this.setState({
                                        up: false
                                    });
                                }, 300);
                            });*/

                            this.props.getSelectedFeatureDetail(
                                this.processNextFeatureID('up'),
                                featuresList.features
                            );

                            this.resetAnimationClass();

                            setTimeout(() => {
                                document
                                    .getElementById('featureDetailSection')
                                    .classList.add('section-up-animation');
                            }, 50);
                        }}
                    >
                        <img
                            src={require(`../../images/arrowup.png`)}
                            width="100"
                            alt="arrow_up"
                        />
                    </div>

                    <div className="featuredetail featuredetail--gallery">
                        <ImageGallery
                            items={images}
                            autoPlay={true}
                            showPlayButton={false}
                            showFullscreenButton={false}
                            slideDuration={1000}
                            renderItem={item => {
                                return (
                                    <div className="image-gallery-image">
                                        <img
                                            src={item.original}
                                            srcSet={item.srcSet}
                                            style={{
                                                width: '880px',
                                                height: '600px'
                                            }}
                                        />
                                    </div>
                                );
                            }}
                        />
                        <div className="featuredetail featuredetail--gallery--name">
                            {feature.name}
                        </div>
                    </div>

                    <div className="featuredetail featuredetail--description">
                        {/*<p className="aptdetail--description--name">
                            {apartment.name}
                        </p>*/}
                        <p>{feature.description}</p>
                        <p className="featuredetail--description--contact">
                            <span>If you would like to find out more</span>
                            <br />
                            {feature.phone}
                            <br /> {feature.open_hours}
                        </p>
                    </div>

                    <div
                        className={
                            down
                                ? 'featuredetail featuredetail--down--arrow featuredetail featuredetail--click'
                                : 'featuredetail featuredetail--down--arrow featuredetail featuredetail--clicked'
                        }
                        onClick={() => {
                            {
                                /*FOR ARROW BUTTON ANIMATION PURPOSE ONLY*/
                            }
                            /*this.setState({ down: true }, () => {
                                setTimeout(() => {
                                    this.setState({
                                        down: false
                                    });
                                }, 300);
                            });*/
                            this.props.getSelectedFeatureDetail(
                                this.processNextFeatureID('up'),
                                featuresList.features
                            );

                            this.resetAnimationClass();

                            setTimeout(() => {
                                document
                                    .getElementById('featureDetailSection')
                                    .classList.add('section-down-animation');
                            }, 50);
                        }}
                    >
                        <img
                            src={require(`../../images/arrowdown.png`)}
                            width="100"
                            alt="arrow_down"
                        />
                    </div>
                </div>
            );
        } else {
            return <div>Loading </div>;
        }
    }
}

function mapStateToProps({ featuresList, featureDetail }) {
    return { featuresList, featureDetail };
}

export default connect(mapStateToProps, actions)(FeatureDetail);
