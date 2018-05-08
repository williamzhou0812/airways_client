import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './Menu.css';

class Menu extends Component {
    constructor(props) {
        super(props);
        const { location } = this.props.router;
        let currentMenuId = '/apartments';
        if (location.pathname !== '/') {
            currentMenuId = location.pathname;
        }
        this.state = {
            currentMenu: currentMenuId
        };
    }

    render() {
        const { currentMenu } = this.state;
        const { navigateTo } = this.props;
        return (
            <div className="menu">
                <div
                    className={
                        currentMenu.includes('apartments')
                            ? 'menuItem menuItem--apartments menuItem--active'
                            : 'menuItem menuItem--apartments menuItem--inactive'
                    }
                    onClick={() => {
                        navigateTo('/apartments');
                        this.setState({ currentMenu: '/apartments' });
                    }}
                >
                    <img
                        src={require(`../../images/menu_apartment_icon.png`)}
                        width="90"
                        alt="menu_apartment_icon"
                    />
                    <p className="menuText">APARTMENTS</p>
                </div>
                <div
                    className={
                        currentMenu.includes('/around')
                            ? 'menuItem menuItem--maps menuItem--active'
                            : 'menuItem menuItem--maps menuItem--inactive'
                    }
                    onClick={() => {
                        navigateTo('/around');
                        this.setState({ currentMenu: '/around' });
                    }}
                >
                    <img
                        src={require(`../../images/menu_around.png`)}
                        width="90"
                        alt="menu_around"
                    />
                    <p className="menuText">AROUND PORT MORESBY</p>
                </div>
                <div
                    className={
                        currentMenu.includes('/features')
                            ? 'menuItem menuItem--features menuItem--active'
                            : 'menuItem menuItem--features menuItem--inactive'
                    }
                    onClick={() => {
                        navigateTo('/features');
                        this.setState({ currentMenu: '/features' });
                    }}
                >
                    <img
                        src={require(`../../images/menu_feature_icon.png`)}
                        width="90"
                        alt="menu_feature_icon"
                    />
                    <p className="menuText">FEATURES & FACILITIES</p>
                </div>
                <div
                    className={
                        currentMenu.includes('/gallery')
                            ? 'menuItem menuItem--gallery menuItem--active'
                            : 'menuItem menuItem--gallery menuItem--inactive'
                    }
                    onClick={() => {
                        navigateTo('/gallery');
                        this.setState({ currentMenu: '/gallery' });
                    }}
                >
                    <img
                        src={require(`../../images/menu_gallery_icon.png`)}
                        width="90"
                        alt="menu_gallery_icon"
                    />
                    <p className="menuText">GALLERY</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ router }) {
    return { router };
}

export default connect(mapStateToProps, actions)(Menu);
