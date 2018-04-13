import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './Apartments.css';
import _ from 'lodash';
import { createImageURL } from '../utils/Constants';
import { Link } from 'react-router-dom';

class Apartments extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.apartmentsList.apartments);
    }

    renderEachApartment() {
        return _.map(
            this.props.apartmentsList.apartments,
            ({ id, name, images_path }) => {
                return (
                    <Link to={`/apartments/${id}`} key={id}>
                        <div
                            className="aptsection--list--each"
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
                            <div className="aptsection--list--each--name">
                                {name}
                            </div>
                        </div>
                    </Link>
                );
            }
        );
    }

    render() {
        const { apartmentsList } = this.props;
        if (!_.isEmpty(apartmentsList)) {
            return (
                <div>
                    <div className="main-section-animation">
                        <div className="apt--container">
                            <div className="aptsection  ">
                                <div className=" aptsection--list">
                                    {this.renderEachApartment()}
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

function mapStateToProps({ apartmentsList }) {
    return { apartmentsList };
}

export default connect(mapStateToProps, actions)(Apartments);
