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
            match
        } = this.props;
        getDirectoryDisplayListBySection(
            directoryDisplayList.directory_displays[match.params.id]
        );
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

    processNextDirectoryDisplayList(action) {
        const {
            directoryDisplayList,
            directoryDisplayListBySection,
            getDirectoryDisplayListBySection
        } = this.props;

        let sectionIdList = new Array();
        _.forEach(this.props.sectionList.sections, (value, key) => {
            sectionIdList.push(value.id);
        });

        let selectedSectionKey;
        let selectedSectionId = _.find(sectionIdList, (item, index) => {
            selectedSectionKey = index;
            return (
                item ===
                directoryDisplayListBySection.directory_displays[0].section.data
                    .id
            );
        });

        let nextSectionKey = selectedSectionKey;
        if (action === 'up') {
            nextSectionKey = nextSectionKey - 1;
            if (nextSectionKey === -1) {
                nextSectionKey = sectionIdList.length - 1;
            }
        }

        if (action === 'down') {
            nextSectionKey = nextSectionKey + 1;
            if (nextSectionKey === sectionIdList.length) {
                nextSectionKey = 0;
            }
        }

        getDirectoryDisplayListBySection(
            directoryDisplayList.directory_displays[
                sectionIdList[nextSectionKey]
            ]
        );
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

    render() {
        const { directoryDisplayListBySection } = this.props;
        if (directoryDisplayListBySection.status === 200) {
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
                            {
                                directoryDisplayListBySection
                                    .directory_displays[0].section.data.name
                            }
                        </div>
                        <div className="sectionlistsection sectionlistsection--list">
                            {this.renderEachDirectoryDisplay()}
                            {this.renderEmptyDirectoryDisplaySpace()}
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
                <div className="main-section-animation">
                    NO DIRECTORY DISPLAY
                </div>
            );
        }
    }
}

function mapStateToProps({
    directoryDisplayList,
    sectionList,
    directoryDisplayListBySection
}) {
    return {
        directoryDisplayList,
        sectionList,
        directoryDisplayListBySection
    };
}

export default connect(mapStateToProps, actions)(SectionList);
