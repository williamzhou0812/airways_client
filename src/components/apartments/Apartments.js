import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './Apartments.css';
import _ from 'lodash';
import { createImageURL } from '../utils/Constants';

class Apartments extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.apartmentsList.apartments);
    }

    renderEachApartment() {
        return _.map(
            this.props.apartmentsList.apartments.concat(
                this.props.apartmentsList.apartments
            ),
            ({ name, images_path }) => {
                return (
                    <div
                        className="aptsection--list--each"
                        style={{
                            backgroundImage: `url(${createImageURL(
                                images_path[0]
                            )})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <div className="aptsection--list--each--name">
                            <span>{name}</span>
                        </div>
                    </div>
                );
            }
        );
    }

    render() {
        return (
            <div
                className="main-section-animation"
                style={{ backgroundColor: 'red' }}
            >
                <div className="apt--container">
                    <div className="aptsection aptsection--sidebar">
                        <p>APARTMENTS</p>
                    </div>
                    <div className="aptsection  ">
                        <div className=" aptsection--list">
                            {this.renderEachApartment()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ apartmentsList }) {
    return { apartmentsList };
}

export default connect(mapStateToProps, actions)(Apartments);
