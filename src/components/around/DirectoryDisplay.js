import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import "./DirectoryDisplay.css";
import _ from "lodash";
import { createImageURL } from "../utils/Constants";
import ImageGallery from "react-image-gallery";

class DirectoryDisplay extends Component {
    constructor(props) {
        super(props);
        const { match, setSelectedSection, sectionList } = this.props;
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

    moveDirectoryDisplay(action) {
        const { currentSection, directoryDisplayDetail } = this.props;
        const current_directory_display_list =
            currentSection.sections.directory_display.data;
        const current_directory_display_detail =
            directoryDisplayDetail.directory_display;
        let current_directory_display_detail_index = parseInt(
            current_directory_display_list.indexOf(
                _.find(current_directory_display_list, (item, index) => {
                    return (
                        item.id ===
                        parseInt(current_directory_display_detail.id, 10)
                    );
                })
            ),
            10
        );
        let moveID;

        if (action === "next") {
            if (
                current_directory_display_list.indexOf(
                    directoryDisplayDetail.directory_display
                ) +
                    1 ===
                current_directory_display_list.length
            ) {
                moveID = 0;
            } else {
                moveID = current_directory_display_detail_index + 1;
            }
        }

        if (action === "previous") {
            if (
                current_directory_display_list.indexOf(
                    directoryDisplayDetail.directory_display
                ) +
                    1 ===
                1
            ) {
                moveID = current_directory_display_list.length - 1;
            } else {
                moveID = current_directory_display_detail_index - 1;
            }
        }

        return current_directory_display_list[moveID];
    }

    resetAnimationClass() {
        document
            .getElementById("directoryDetailSection")
            .classList.remove("main-section-animation");
        document
            .getElementById("directoryDetailSection")
            .classList.remove("section-left-animation");
        document
            .getElementById("directoryDetailSection")
            .classList.remove("section-right-animation");
    }

    render() {
        const { directory_display } = this.props.directoryDisplayDetail;
        if (!_.isEmpty(directory_display, this.props.currentSection)) {
            const images = this.processImageList(directory_display);

            return (
                <div
                    className="directorydisplay--detail--container main-section-animation"
                    id="directoryDetailSection"
                >
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
                                                width: "880px",
                                                height: "600px"
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
                            <div
                                className="directorydisplay--detail--item--subheading--container--previous"
                                onClick={() => {
                                    this.resetAnimationClass();
                                    setTimeout(() => {
                                        document
                                            .getElementById(
                                                "directoryDetailSection"
                                            )
                                            .classList.add(
                                                "section-left-animation"
                                            );
                                    }, 1);
                                    this.props.setSelectedDirectoryDisplay(
                                        this.moveDirectoryDisplay("previous")
                                    );
                                }}
                            >
                                PREVIOUS
                            </div>
                            <div className="directorydisplay--detail--item--subheading--container--text">
                                {directory_display.subheading}
                            </div>
                            <div
                                className="directorydisplay--detail--item--subheading--container--next"
                                onClick={() => {
                                    this.resetAnimationClass();
                                    setTimeout(() => {
                                        document
                                            .getElementById(
                                                "directoryDetailSection"
                                            )
                                            .classList.add(
                                                "section-right-animation"
                                            );
                                    }, 1);
                                    this.props.setSelectedDirectoryDisplay(
                                        this.moveDirectoryDisplay("next")
                                    );
                                }}
                            >
                                NEXT
                            </div>
                        </div>
                    </div>
                    <div className="directorydisplay--detail--item--description">
                        <div className="directorydisplay--detail--item--description--container">
                            <div className="directorydisplay--detail--item--description--container--topWhite" />
                            <div className="directorydisplay--detail--item--description--container--bottomWhite" />
                            <div className="directorydisplay--detail--item--description--container--left">
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            directory_display.left_description
                                    }}
                                />
                            </div>
                            <div className="directorydisplay--detail--item--description--container--right">
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            directory_display.right_description
                                    }}
                                />
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

export default connect(
    mapStateToProps,
    actions
)(DirectoryDisplay);
