import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import "./ApartmentDetail.css";
import _ from "lodash";
import { createImageURL } from "../utils/Constants";
import ImageGallery from "react-image-gallery";

class ApartmentDetail extends Component {
    constructor(props) {
        super(props);
        const {
            getSelectedApartmentDetail,
            match,
            apartmentsList,
            setBackButton
        } = this.props;
        getSelectedApartmentDetail(match.params.id, apartmentsList.apartments);
        setBackButton("/apartments", true);

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
        const apartment_list = this.props.apartmentsList.apartments;
        const apartment_detail = this.props.apartmentDetail.apartment;
        let current_apartment_detail_index = parseInt(
            apartment_list.indexOf(
                _.find(apartment_list, (item, index) => {
                    return item.id === parseInt(apartment_detail.id, 10);
                })
            ),
            10
        );
        let nextID;

        if (action === "up") {
            if (
                apartment_list.indexOf(apartment_detail) + 1 ===
                apartment_list.length
            ) {
                nextID = 0;
            } else {
                nextID = current_apartment_detail_index + 1;
            }
        }

        if (action === "down") {
            if (apartment_list.indexOf(apartment_detail) + 1 === 1) {
                nextID = apartment_list.length - 1;
            } else {
                nextID = current_apartment_detail_index - 1;
            }
        }
        return nextID;
    }

    resetAnimationClass() {
        document
            .getElementById("apartmentDetailSection")
            .classList.remove("main-section-animation");
        document
            .getElementById("apartmentDetailSection")
            .classList.remove("section-down-animation");
        document
            .getElementById("apartmentDetailSection")
            .classList.remove("section-up-animation");
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
                                ? "aptdetail aptdetail--up--arrow aptdetail aptdetail--click"
                                : "aptdetail aptdetail--up--arrow aptdetail aptdetail--clicked"
                        }
                        onClick={() => {
                            this.resetAnimationClass();
                            setTimeout(() => {
                                document
                                    .getElementById("apartmentDetailSection")
                                    .classList.add("section-up-animation");
                            }, 1);
                            this.props.getSelectedApartmentDetail(
                                apartmentsList.apartments[
                                    this.processNextApartmentID("up")
                                ].id,
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
                                                width: "880px",
                                                height: "600px"
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
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: apartment.description
                                }}
                            />
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
                                ? "aptdetail aptdetail--down--arrow aptdetail aptdetail--click"
                                : "aptdetail aptdetail--down--arrow aptdetail aptdetail--clicked"
                        }
                        onClick={() => {
                            this.resetAnimationClass();
                            setTimeout(() => {
                                document
                                    .getElementById("apartmentDetailSection")
                                    .classList.add("section-down-animation");
                            }, 1);
                            this.props.getSelectedApartmentDetail(
                                apartmentsList.apartments[
                                    this.processNextApartmentID("down")
                                ].id,
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

export default connect(
    mapStateToProps,
    actions
)(ApartmentDetail);
