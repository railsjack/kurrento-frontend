import React, {Component} from 'react';
import {Nav} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

import {AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import DefaultHeaderDropdown from './DefaultHeaderDropdown'
import logo from '../../../assets/img/brand/logo.png'
import sygnet from '../../../assets/img/brand/sygnet.svg'
//style Santosh
import '../_Styles/customStyleTwo.css';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const {children, ...attributes} = this.props;
    const userData = JSON.parse(sessionStorage.getItem('user'));

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile/>
        <NavLink
          to={'/dashboard'}
          className={'navbar-brand'}>
          <AppNavbarBrand
            tag={'div'}
            full={{src: '/assets/img/favicon.png', width: 30, alt: 'Avatar Insurance Logo'}}
            minimized={{src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo'}}
          />
        </NavLink>
        <AppSidebarToggler className="d-md-down-none mr-auto" display="lg"/>
        <Nav className="ml-lg-5" navbar>
          <strong>{'Welcome, ' + 'admin'}</strong>
          <DefaultHeaderDropdown onLogout={this.props.onLogout} accnt/>
        </Nav>
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
