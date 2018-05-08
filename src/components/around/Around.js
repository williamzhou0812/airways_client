import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './Around.css';
import { createImageURL } from '../utils/Constants';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class Around extends Component {
    constructor(props) {
        super(props);
        this.props.setBackButton('/around', false);
    }
    handleClick(e, item) {
        this.props.setSelectedSection(item);
    }
    renderEachSection() {
        return _.map(
            _.filter(this.props.sectionList.sections, item => {
                return item.directory_display.data.length > 0;
            }),
            item => {
                return (
                    <Link to={`/around/${item.id}`} key={item.id}>
                        <div
                            className="aroundsection--list"
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
                            onClick={e => this.handleClick(e, item)}
                        >
                            <div className="aroundsection--list--name">
                                {item.name}
                            </div>
                        </div>
                    </Link>
                );
            }
        );
    }

    render() {
        if (!_.isEmpty(this.props.sectionList)) {
            return (
                <div className="main-section-animation">
                    <div className="around--container">
                        {this.renderEachSection()}
                    </div>
                </div>
            );
        } else {
            <p>loading</p>;
        }
    }
}

function mapStateToProps({ sectionList }) {
    return {
        sectionList
    };
}

export default connect(mapStateToProps, actions)(Around);
