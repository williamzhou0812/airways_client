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

        this.props.getDirectoryDisplayListBySection(
            this.props.directoryDisplayList.directory_displays[
                this.props.match.params.id
            ]
        );

        this.state = {
            up: false,
            down: false
        };
    }

    render() {
        if (this.props.directoryDisplayListBySection.status === 200) {
            return <div className="main-section-animation">SECTION LIST</div>;
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
