import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './SectionList.css';
import { createImageURL } from '../utils/Constants';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class SectionList extends Component {
    constructor(props) {
        super(props);
        const {
            getDirectoryDisplayListBySection,
            directoryDisplayList,
            setSelectedSection,
            sectionList,
            match
        } = this.props;

        getDirectoryDisplayListBySection(
            directoryDisplayList.directory_displays[match.params.id]
        );
        setSelectedSection(sectionList.sections[match.params.id]);

        this.state = {
            total_directory_display: -1
        };
    }

    componentDidMount() {
        const {
            getDirectoryDisplayListBySection,
            directoryDisplayList,
            match
        } = this.props;
        getDirectoryDisplayListBySection(
            directoryDisplayList.directory_displays[match.params.id]
        );
    }

    processNextDirectoryDisplayList(action) {
        const {
            directoryDisplayList,
            directoryDisplayListBySection,
            getDirectoryDisplayListBySection,
            currentSection,
            sectionList,
            setSelectedSection
        } = this.props;

        let sectionIdList = new Array();

        _.forEach(this.props.sectionList.sections, (value, key) => {
            sectionIdList.push(value.id);
        });

        let selectedSectionKey;
        let selectedSectionId = _.find(sectionIdList, (item, index) => {
            selectedSectionKey = index;
            return item === currentSection.sections.id;
        });

        /*FOR UPDATE DIRECTORY DISPLAY LIST TO REDUX STORE*/
        let nextDirectoryDisplayListID = selectedSectionKey;
        if (action === 'up') {
            nextDirectoryDisplayListID = nextDirectoryDisplayListID - 1;
            if (nextDirectoryDisplayListID === -1) {
                nextDirectoryDisplayListID = sectionIdList.length - 1;
            }
        }

        if (action === 'down') {
            nextDirectoryDisplayListID = nextDirectoryDisplayListID + 1;
            if (nextDirectoryDisplayListID === sectionIdList.length) {
                nextDirectoryDisplayListID = 0;
            }
        }

        getDirectoryDisplayListBySection(
            directoryDisplayList.directory_displays[
                sectionIdList[nextDirectoryDisplayListID]
            ]
        );

        /*FOR UPDATE CURRENT SECTION LIST TO REDUX STORE*/
        let nextSectionListID = -1;

        _.find(sectionList.sections, (item, index) => {
            nextSectionListID = index;
            return item.id === currentSection.sections.id;
        });

        if (action === 'up') {
            nextSectionListID = nextSectionListID - 1;
            if (nextSectionListID === -1) {
                nextSectionListID = sectionList.sections.length - 1;
            }
        }

        if (action === 'down') {
            nextSectionListID = nextSectionListID + 1;
            if (nextSectionListID === sectionList.sections.length) {
                nextSectionListID = 0;
            }
        }

        setSelectedSection(sectionList.sections[nextSectionListID]);
    }

    resetAnimationClass() {
        document
            .getElementById('SectionListDetailSection')
            .classList.remove('main-section-animation');
        document
            .getElementById('SectionListDetailSection')
            .classList.remove('section-down-animation');
        document
            .getElementById('SectionListDetailSection')
            .classList.remove('section-up-animation');
    }

    renderEachDirectoryDisplay() {
        const { directoryDisplayListBySection } = this.props;

        return _.map(
            directoryDisplayListBySection.directory_displays,
            ({ id, heading, subheading, images_path }) => {
                return (
                    <div className="sectionlistsection--list--item">
                        <div
                            className="sectionlistsection--list--item--image"
                            style={
                                !_.isEmpty(images_path[0]) && {
                                    backgroundImage: `url(${createImageURL(
                                        images_path[0]
                                    )})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }
                            }
                        />
                        <div className="sectionlistsection--list--item--name">
                            <div className="sectionlistsection--list--item--name--heading">
                                {heading}
                            </div>
                            <div className="sectionlistsection--list--item--name--subheading">
                                {subheading}
                            </div>
                        </div>
                    </div>
                );
            }
        );
    }

    renderEmptyDirectoryDisplaySpace() {
        const { directoryDisplayListBySection } = this.props;
        return _.times(
            6 - directoryDisplayListBySection.directory_displays.length,
            () => {
                return (
                    <div className="sectionlistsection--list--item">
                        <div className="sectionlistsection--list--item--image" />
                        <div className="sectionlistsection--list--item--name" />
                    </div>
                );
            }
        );
    }

    renderNoDirectoryDisplay() {
        return (
            <div className="error--directory--display--list">
                <p className="error--directory--display--list--text">
                    NO DIRECTORY DISPLAY
                </p>
            </div>
        );
    }

    render() {
        const {
            directoryDisplayListBySection,
            match,
            sectionList,
            currentSection
        } = this.props;
        if (
            !_.isEmpty(directoryDisplayListBySection.directory_displays) &&
            !_.isEmpty(currentSection.sections)
        ) {
            return (
                <div
                    className="main-section-animation"
                    id="SectionListDetailSection"
                >
                    <div className="sectionlist--container">
                        <div
                            className="sectionlistsection sectionlistsection--up sectionlistsection--arrow"
                            onClick={() => {
                                this.resetAnimationClass();
                                setTimeout(() => {
                                    document
                                        .getElementById(
                                            'SectionListDetailSection'
                                        )
                                        .classList.add('section-up-animation');
                                }, 1);
                                this.processNextDirectoryDisplayList('up');
                            }}
                        >
                            <img
                                src={require(`../../images/arrowup.png`)}
                                width="100"
                                alt="arrow_up"
                            />
                        </div>
                        <div className="sectionlistsection sectionlistsection--heading">
                            {currentSection.sections.name}
                        </div>
                        <div className="sectionlistsection sectionlistsection--list">
                            {directoryDisplayListBySection.status === 400 &&
                                this.renderNoDirectoryDisplay()}
                            {directoryDisplayListBySection.status === 200 &&
                                this.renderEachDirectoryDisplay()}
                            {directoryDisplayListBySection.status === 200 &&
                                this.renderEmptyDirectoryDisplaySpace()}
                        </div>
                        <div
                            className="sectionlistsection sectionlistsection--down sectionlistsection--arrow"
                            onClick={() => {
                                this.resetAnimationClass();
                                setTimeout(() => {
                                    document
                                        .getElementById(
                                            'SectionListDetailSection'
                                        )
                                        .classList.add(
                                            'section-down-animation'
                                        );
                                }, 1);
                                this.processNextDirectoryDisplayList('down');
                            }}
                        >
                            <img
                                src={require(`../../images/arrowdown.png`)}
                                width="100"
                                alt="arrow_down"
                            />
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div
                    className="main-section-animation"
                    id="SectionListDetailSection"
                >
                    <p>Loading</p>
                </div>
            );
        }
    }
}

function mapStateToProps({
    directoryDisplayList,
    sectionList,
    directoryDisplayListBySection,
    currentSection
}) {
    return {
        directoryDisplayList,
        sectionList,
        directoryDisplayListBySection,
        currentSection
    };
}

export default connect(mapStateToProps, actions)(SectionList);
