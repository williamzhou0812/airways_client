import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import './Menu.css';

class Menu extends Component {
    render() {
        return (
            <div className="menu">
                <div className="menuItem menuItem--apartments">
                    <img
                        src={require(`../../images/menu_apartment_icon.png`)}
                        width="90"
                        alt="menu_apartment_icon"
                    />
                    <p className="menuText">Apartments</p>
                </div>
                <div className="menuItem menuItem--maps menuIcon">
                    <img
                        src={require(`../../images/menu_map_icon.png`)}
                        width="90"
                        alt="menu_map_icon"
                    />
                    <p className="menuText">Maps</p>
                </div>
                <div className="menuItem menuItem--features">
                    <img
                        src={require(`../../images/menu_feature_icon.png`)}
                        width="90"
                        alt="menu_feature_icon"
                    />
                    <p className="menuText">Features</p>
                </div>
                <div className="menuItem menuItem--gallery">
                    <img
                        src={require(`../../images/menu_gallery_icon.png`)}
                        width="90"
                        alt="menu_gallery_icon"
                    />
                    <p className="menuText">Gallery</p>
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(Menu);
