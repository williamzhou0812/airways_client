import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './Apartments.css';
import _ from 'lodash';
import { createImageURL } from '../utils/Constants';

class ApartmentDetail extends Component {
    constructor(props) {
        super(props);
        this.props.getSelectedApartmentDetail(
            this.props.match.params.id,
            this.props.apartmentsList.apartments
        );
    }

    componentDidMount() {
        this.props.getSelectedApartmentDetail(
            this.props.match.params.id,
            this.props.apartmentsList.apartments
        );

        console.log(this.props.apartmentDetail);
    }

    render() {
        if (!_.isEmpty(this.props.apartmentDetail)) {
            return (
                <div className="main-section-animation">
                    ApartmentDetail {this.props.apartmentDetail.apartment.id}
                </div>
            );
        } else {
            return <div>Loading </div>;
        }
    }
}

function mapStateToProps({ apartmentsList, apartmentDetail }) {
    return { apartmentsList, apartmentDetail };
}

export default connect(mapStateToProps, actions)(ApartmentDetail);
