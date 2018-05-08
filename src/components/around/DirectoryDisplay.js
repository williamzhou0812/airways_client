import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './DirectoryDisplay.css';
import _ from 'lodash';
import { createImageURL } from '../utils/Constants';
import ImageGallery from 'react-image-gallery';

class DirectoryDisplay extends Component {
    constructor(props) {
        super(props);
        const {
            match,
            setSelectedSection,
            sectionList,
            currentSection
        } = this.props;
        this.props.setBackButton(`/around/${match.params.id}`, true);

        setSelectedSection(
            _.find(sectionList.sections, (item, index) => {
                return item.id === parseInt(match.params.id, 10);
            })
        );
    }
    componentWillReceiveProps(nextProps) {
        if (
            !_.isEmpty(nextProps.currentSection.sections.directory_display) &&
            _.isEmpty(this.props.directoryDisplayDetail.directory_display)
        ) {
            nextProps.setSelectedDirectoryDisplay(
                _.find(
                    nextProps.currentSection.sections.directory_display.data,
                    (item, index) => {
                        return (
                            item.id === parseInt(nextProps.match.params.did, 10)
                        );
                    }
                )
            );
        }
    }
    componentDidMount() {}

    processImageList(directory_display) {
        let images = [];
        directory_display.images_path.forEach(each => {
            images.push({
                original: createImageURL(each)
            });
        });
        return images;
    }

    render() {
        const { directory_display } = this.props.directoryDisplayDetail;
        console.log(directory_display);
        if (!_.isEmpty(directory_display)) {
            const images = this.processImageList(directory_display);

            return (
                <div className="directorydisplay--detail--container main-section-animation">
                    <div className="directorydisplay--detail--item--heading">
                        {directory_display.heading}
                    </div>
                    <div className="directorydisplay--detail--item--image">
                        <ImageGallery
                            items={images}
                            autoPlay={true}
                            showPlayButton={false}
                            showFullscreenButton={false}
                            slideDuration={1000}
                            showThumbnails={false}
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
                                            alt={item.original}
                                        />
                                    </div>
                                );
                            }}
                        />
                    </div>
                    <div className="directorydisplay--detail--item--subheading">
                        <div className="directorydisplay--detail--item--subheading--container">
                            <div className="directorydisplay--detail--item--subheading--container--previous">
                                PREVIOUS
                            </div>
                            <div className="directorydisplay--detail--item--subheading--container--text">
                                {directory_display.subheading}
                            </div>
                            <div className="directorydisplay--detail--item--subheading--container--next">
                                NEXT
                            </div>
                        </div>
                    </div>
                    <div className="directorydisplay--detail--item--description">
                        <div className="directorydisplay--detail--item--description--container">
                            <div className="directorydisplay--detail--item--description--container--left">
                                {directory_display.left_description}
                            </div>
                            <div className="directorydisplay--detail--item--description--container--right">
                                {directory_display.right_description}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <p>loading</p>;
        }
    }
}

function mapStateToProps({
    directoryDisplayDetail,
    sectionList,
    currentSection
}) {
    return { directoryDisplayDetail, sectionList, currentSection };
}

export default connect(mapStateToProps, actions)(DirectoryDisplay);
