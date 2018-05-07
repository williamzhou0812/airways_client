import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './Features.css';
import _ from 'lodash';
import { createImageURL } from '../utils/Constants';
import { Link } from 'react-router-dom';

class Features extends Component {
    componentDidMount() {
        this.props.setBackButton('/features', false);
    }

    renderEachFeature() {
        return _.map(
            this.props.featuresList.features,
            ({ id, name, images_path }) => {
                return (
                    <Link to={`/features/${id}`} key={id}>
                        <div
                            className="featuresection--list--each"
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
                        >
                            <div className="featuresection--list--each--name">
                                {name}
                            </div>
                        </div>
                    </Link>
                );
            }
        );
    }

    render() {
        const { featuresList } = this.props;
        if (!_.isEmpty(featuresList)) {
            return (
                <div>
                    <div className="main-section-animation">
                        <div className="feature--container">
                            <div className="featuresection  ">
                                <div className=" featuresection--list">
                                    {this.renderEachFeature()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <div>loading</div>;
        }
    }
}

function mapStateToProps({ featuresList }) {
    return { featuresList };
}

export default connect(mapStateToProps, actions)(Features);
