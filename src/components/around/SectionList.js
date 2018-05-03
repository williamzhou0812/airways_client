import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './SectionList.css';
import { createImageURL } from '../utils/Constants';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class SectionList extends Component {
    render() {
        return <div className="main-section-animation">SECTION LIST</div>;
    }
}

function mapStateToProps({ directoryDisplayList, sectionList }) {
    return {
        directoryDisplayList,
        sectionList
    };
}

export default connect(mapStateToProps, actions)(SectionList);
