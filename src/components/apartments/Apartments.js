import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './Apartments.css';

class Apartments extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.apartmentsList.apartments);
    }

    render() {
        return (
            <div
                className="main-section-animation"
                style={{ backgroundColor: 'red' }}
            >
                <p>Apartments</p>
            </div>
        );
    }
}

function mapStateToProps({ apartmentsList }) {
    return { apartmentsList };
}

export default connect(mapStateToProps, actions)(Apartments);
