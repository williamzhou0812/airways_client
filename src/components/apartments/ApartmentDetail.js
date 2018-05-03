import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './ApartmentDetail.css';
import _ from 'lodash';
import { createImageURL } from '../utils/Constants';
import ImageGallery from 'react-image-gallery';

class ApartmentDetail extends Component {
    constructor(props) {
        super(props);
        const {
            getSelectedApartmentDetail,
            match,
            apartmentsList
        } = this.props;
        getSelectedApartmentDetail(match.params.id, apartmentsList.apartments);
        this.state = {
            up: false,
            down: false
        };
    }

    componentDidMount() {
        const {
            getSelectedApartmentDetail,
            match,
            apartmentsList
        } = this.props;
        getSelectedApartmentDetail(match.params.id, apartmentsList.apartments);
    }

    processImageList(apartment) {
        let images = [];
        apartment.images_path.forEach(each => {
            images.push({
                original: createImageURL(each),
                thumbnail: createImageURL(each)
            });
        });
        return images;
    }

    processNextApartmentID(action) {
        const { apartmentDetail, apartmentsList } = this.props;
        let nextID;
        if (action === 'up') {
            if (
                apartmentDetail.apartment.id ===
                apartmentsList.apartments.length
            ) {
                nextID = 1;
            } else {
                nextID = parseInt(apartmentDetail.apartment.id, 10) + 1;
            }
        }

        if (action === 'down') {
            if (apartmentDetail.apartment.id === 1) {
                nextID = apartmentsList.apartments.length;
            } else {
                nextID = parseInt(apartmentDetail.apartment.id, 10) - 1;
            }
        }
        return nextID;
    }

    resetAnimationClass() {
        document
            .getElementById('apartmentDetailSection')
            .classList.remove('main-section-animation');
        document
            .getElementById('apartmentDetailSection')
            .classList.remove('section-down-animation');
        document
            .getElementById('apartmentDetailSection')
            .classList.remove('section-up-animation');
    }

    render() {
        const { up, down } = this.state;
        const { apartmentsList } = this.props;
        const { apartment } = this.props.apartmentDetail;

        if (!_.isEmpty(this.props.apartmentDetail)) {
            const images = this.processImageList(apartment);
            return (
                <div
                    className="apt--detail--container main-section-animation"
                    id="apartmentDetailSection"
                >
                    <div
                        className={
                            up
                                ? 'aptdetail aptdetail--up--arrow aptdetail aptdetail--click'
                                : 'aptdetail aptdetail--up--arrow aptdetail aptdetail--clicked'
                        }
                        onClick={() => {
                            this.resetAnimationClass();
                            setTimeout(() => {
                                document
                                    .getElementById('apartmentDetailSection')
                                    .classList.add('section-up-animation');
                            }, 1);
                            this.props.getSelectedApartmentDetail(
                                this.processNextApartmentID('up'),
                                apartmentsList.apartments
                            );
                        }}
                    >
                        <img
                            src={require(`../../images/arrowup.png`)}
                            width="100"
                            alt="arrow_up"
                        />
                    </div>

                    <div className="aptdetail aptdetail--gallery">
                        <ImageGallery
                            items={images}
                            autoPlay={true}
                            showPlayButton={false}
                            showFullscreenButton={false}
                            slideDuration={1000}
                            renderItem={item => {
                                return (
                                    <div className="image-gallery-image">
                                        <img
                                            src={item.original}
                                            srcSet={item.srcSet}
                                            style={{
                                                width: '880px',
                                                height: '600px'
                                            }}
                                            alt={item.original}
                                        />
                                    </div>
                                );
                            }}
                        />
                        <div className="aptdetail aptdetail--gallery--name">
                            {apartment.name}
                        </div>
                    </div>

                    <div className="aptdetail aptdetail--description aptdetail--description--container">
                        <div className="aptdetail--description--container--leftWhite" />
                        <div className="aptdetail--description--container--rightWhite" />
                        <div className="aptdetail--description--container--desc">
                            <p>{apartment.description}</p>
                        </div>
                        <div className="aptdetail--description--container--contact">
                            <p className="aptdetail--description--contact">
                                <span>If you would like to find out more</span>
                                <br />
                                Telephone: {apartment.phone} <br />
                                Office Hours: {apartment.open_hours}
                            </p>
                        </div>
                    </div>

                    <div
                        className={
                            down
                                ? 'aptdetail aptdetail--down--arrow aptdetail aptdetail--click'
                                : 'aptdetail aptdetail--down--arrow aptdetail aptdetail--clicked'
                        }
                        onClick={() => {
                            this.resetAnimationClass();
                            setTimeout(() => {
                                document
                                    .getElementById('apartmentDetailSection')
                                    .classList.add('section-down-animation');
                            }, 1);
                            this.props.getSelectedApartmentDetail(
                                this.processNextApartmentID('up'),
                                apartmentsList.apartments
                            );
                        }}
                    >
                        <img
                            src={require(`../../images/arrowdown.png`)}
                            width="100"
                            alt="arrow_down"
                        />
                    </div>
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
