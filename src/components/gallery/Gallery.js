import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './Gallery.css';

class Gallery extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.galleryList.gallery);
    }

    render() {
        return (
            <div
                className="main-section-animation"
                style={{ backgroundColor: 'green' }}
            >
                <p>Gallery</p>
            </div>
        );
    }
}
function mapStateToProps({ galleryList }) {
    return { galleryList };
}

export default connect(mapStateToProps, actions)(Gallery);
