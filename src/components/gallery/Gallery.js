import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './Gallery.css';
import _ from 'lodash';
import { createImageURL } from '../utils/Constants';

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.handleClickThumbnail = this.handleClickThumbnail.bind(this);

        this.state = {
            currentImage: this.props.galleryList.gallery[0],
            opacity: 1
        };
    }

    componentDidMount() {
        console.log(this.props.galleryList.gallery);
    }

    handleClickThumbnail(event, currentImage) {
        this.setState(
            {
                currentImage: currentImage,
                opacity: 0
            },
            () => {
                this.setState({
                    opacity: 1
                });
            }
        );
    }

    renderThumbnailItem() {
        return _.map(this.props.galleryList.gallery, item => {
            return (
                <div
                    className="thumbnail--item"
                    key={item.id}
                    style={
                        !_.isEmpty(item.images_path) && {
                            backgroundImage: `url(${createImageURL(
                                item.images_path
                            )})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }
                    }
                    onClick={e => this.handleClickThumbnail(e, item)}
                />
            );
        });
    }

    render() {
        const { currentImage, opacity } = this.state;
        const { galleryList } = this.props;
        if (!_.isEmpty(galleryList)) {
            return (
                <div className="main-section-animation">
                    <div className="gallery--container">
                        <div
                            className="galleryitem galleryitem--image"
                            style={
                                !_.isEmpty(currentImage.images_path) && {
                                    backgroundImage: `url(${createImageURL(
                                        currentImage.images_path
                                    )})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    transition: 'all 0.5s ease-in',
                                    opacity: opacity
                                }
                            }
                        >
                            <div className="galleryitem--image--name">
                                {currentImage.name}
                            </div>
                        </div>
                        <div className="galleryitem galleryitem--list">
                            <div className="list--container">
                                {this.renderThumbnailItem()}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <div>loading</div>;
        }
    }
}

function mapStateToProps({ galleryList }) {
    return { galleryList };
}

export default connect(mapStateToProps, actions)(Gallery);
