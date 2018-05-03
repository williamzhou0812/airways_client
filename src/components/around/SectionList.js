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
            up: false,
            down: false
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

    render() {
        const { directoryDisplayListBySection } = this.props;
        if (directoryDisplayListBySection.status === 200) {
            return (
                <div className="main-section-animation">
                    <div className="sectionlist--container">
                        <div className="sectionlistsection sectionlistsection--up">
                            UP
                        </div>
                        <div className="sectionlistsection sectionlistsection--heading">
                            HEADING
                        </div>
                        <div className="sectionlistsection sectionlistsection--list">
                            LIST
                        </div>
                        <div className="sectionlistsection sectionlistsection--down">
                            DOWN
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
