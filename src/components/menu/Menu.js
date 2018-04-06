import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import './Menu.css';

class Menu extends Component {
    render() {
        return (
            <div className="menu">
                <div className="menuItem menuItem--apartments">
                    <p>Apartment</p>
                </div>
                <div className="menuItem menuItem--maps">
                    <p>Maps</p>
                </div>
                <div className="menuItem menuItem--features">
                    <p>Features</p>
                </div>
                <div className="menuItem menuItem--gallery">
                    <p>Gallery</p>
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(Menu);
