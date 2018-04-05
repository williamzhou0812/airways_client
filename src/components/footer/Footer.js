import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="footerItem footerItem--name">
                    <p className="footerItem--name--text">
                        © AIRWAYS RESIDENCES 2018
                    </p>
                </div>
                <div className="footerItem footerItem--logo">
                    <img
                        className="footerItem--logo--image"
                        src={require(`../../images/footer_logo.png`)}
                        width="35"
                        alt="footer"
                    />
                </div>
                <div className="footerItem footerItem--website">
                    <p className="footerItem--website--text">
                        AIRWAYSRESIDENCES.COM.PG
                    </p>
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(Footer);
