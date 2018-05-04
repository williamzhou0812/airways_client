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
    }

    componentDidMount() {}

    render() {
        const { directory_display } = this.props.directoryDisplayDetail;
        console.log(directory_display);
        if (!_.isEmpty(directory_display)) {
            return <p>{directory_display.heading}</p>;
        } else {
            return <p>loading</p>;
        }
    }
}

function mapStateToProps({ directoryDisplayDetail }) {
    return { directoryDisplayDetail };
}

export default connect(mapStateToProps, actions)(DirectoryDisplay);
