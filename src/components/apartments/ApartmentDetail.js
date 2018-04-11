import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './ApartmentDetail.css';
import _ from 'lodash';
import { createImageURL } from '../utils/Constants';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import RightIcon from 'material-ui/svg-icons/navigation/chevron-right';
import ImageGallery from 'react-image-gallery';
import { Link } from 'react-router-dom';

class ApartmentDetail extends Component {
    constructor(props) {
        super(props);
        this.props.getSelectedApartmentDetail(
            this.props.match.params.id,
            this.props.apartmentsList.apartments
        );
        this.state = {
            up: false,
            down: false
        };
    }

    componentDidMount() {
        this.props.getSelectedApartmentDetail(
            this.props.match.params.id,
            this.props.apartmentsList.apartments
        );
    }

    render() {
        console.log(this.props.apartmentDetail);
        const { up, down } = this.state;
        const { navigateTo } = this.props;
        const { apartment } = this.props.apartmentDetail;

        if (!_.isEmpty(this.props.apartmentDetail)) {
            return (
                <div className="apt--detail--container main-section-animation">
                    <div
                        className={
                            up
                                ? 'aptdetail aptdetail--up--arrow aptdetail aptdetail--click'
                                : 'aptdetail aptdetail--up--arrow aptdetail aptdetail--clicked'
                        }
                        onClick={() => {
                            console.log('UP');
                            {
                                /*FOR ARROW BUTTON ANIMATION PURPOSE ONLY*/
                            }
                            this.setState({ up: true }, () => {
                                setTimeout(() => {
                                    this.setState({
                                        up: false
                                    });
                                }, 300);
                            });
                            /*this.props.getSelectedApartmentDetail(
                                parseInt(this.props.match.params.id) + 1,
                                this.props.apartmentsList.apartments
                            );*/
                        }}
                    >
                        <Link
                            to={`/apartments/${parseInt(
                                this.props.match.params.id
                            ) + 1}`}
                            style={{ height: '80px', width: '880px' }}
                        >
                            <img
                                src={require(`../../images/arrowup.png`)}
                                width="100"
                                alt="arrow_up"
                            />
                        </Link>
                    </div>

                    <div className="aptdetail aptdetail--gallery">Gallery</div>

                    <div className="aptdetail aptdetail--description">
                        <p className="aptdetail--description--name">
                            {apartment.name}
                        </p>
                        <p>{apartment.description}</p>
                        <p className="aptdetail--description--contact">
                            <span>If you would like to find out more</span>
                            <br />
                            {apartment.phone}
                            <br /> {apartment.open_hours}
                        </p>
                    </div>

                    <div
                        className={
                            down
                                ? 'aptdetail aptdetail--down--arrow aptdetail aptdetail--click'
                                : 'aptdetail aptdetail--down--arrow aptdetail aptdetail--clicked'
                        }
                        onClick={() => {
                            console.log('UP');
                            {
                                /*FOR ARROW BUTTON ANIMATION PURPOSE ONLY*/
                            }
                            this.setState({ down: true }, () => {
                                setTimeout(() => {
                                    this.setState({
                                        down: false
                                    });
                                }, 300);
                            });
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
