import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './Gallery.css';
import _ from 'lodash';
import { createImageURL } from '../utils/Constants';

class Gallery extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.galleryList.gallery);
    }

    renderThumbnailItem() {
        return _.map(this.props.galleryList.gallery, item => {
            return (
                <div
                    className="thumbnail--item"
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
                />
            );
        });
    }

    render() {
        return (
            <div className="main-section-animation">
                <div className="gallery--container">
                    <div className="galleryitem galleryitem--image">
                        1: Orange
                    </div>
                    <div className="galleryitem galleryitem--list">
                        <div className="list--container">
                            {this.renderThumbnailItem()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps({ galleryList }) {
    return { galleryList };
}

export default connect(mapStateToProps, actions)(Gallery);
