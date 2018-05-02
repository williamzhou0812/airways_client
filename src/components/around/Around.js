import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './Around.css';
import { createImageURL } from '../utils/Constants';
import ReactImageMagnify from 'react-image-magnify';
import _ from 'lodash';

class Around extends Component {
    renderEachFeature() {
        return _.map(
            this.props.sectionList.sections,
            ({ id, name, images_path }) => {
                console.log(images_path);
                return (
                    <div
                        className="aroundsection--list"
                        style={
                            !_.isEmpty(images_path) && {
                                backgroundImage: `url(${createImageURL(
                                    images_path
                                )})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }
                        }
                    >
                        <div className="aroundsection--list--name">{name}</div>
                    </div>
                );
            }
        );
    }

    render() {
        return (
            <div className="main-section-animation">
                <div className="around--container">
                    {this.renderEachFeature()}
                </div>
            </div>
        );
    }
}

function mapStateToProps({ directoryDisplayList, sectionList }) {
    return {
        directoryDisplayList,
        sectionList
    };
}

export default connect(mapStateToProps, actions)(Around);
