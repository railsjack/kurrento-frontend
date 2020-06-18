import React, {useState} from 'react';
import {Observable} from "../_CommonModels/ViewModelBase";
import {
    Collapse, DropdownItem, DropdownMenu,
    DropdownToggle,
    Nav, Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown
} from "reactstrap";
import { Link } from 'react-router-dom';

const OsvNavbar = (props: any) => {
    const userDetails = Observable.getReduxValue('userDetails');
    const [isOpen, setNavbarStatus] = useState(false);
    // const name = userDetails.name;
    const name = 'Vitaly Kroivets';
    const toggle = () => {
        setNavbarStatus(!isOpen);
    };
    return <Navbar color="primary" light expand="md">
        <NavbarBrand href="#">
            <img src={userDetails.picture} width={30} height={30}/>
            <span className={'text-white ml-3'}>{name}</span>
        </NavbarBrand>
        <NavbarToggler onClick={toggle}/>
        <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                    {/*Warning: React does not recognize the `inNavbar` prop on a DOM element.*/}
                    {/*waiting for reactstrap@5.0.0-alpha.5*/}
                    <DropdownToggle nav caret className={'text-white'}>
                        Organizations
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>
                            <Link to={'/organization/new/'}>Create Organization</Link>
                        </DropdownItem>
                        <DropdownItem>
                            <Link to={'/organization/list/'}>List Organizations</Link>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                    {/*Warning: React does not recognize the `inNavbar` prop on a DOM element.*/}
                    {/*waiting for reactstrap@5.0.0-alpha.5*/}
                    <DropdownToggle nav caret className={'text-white'}>
                        Event
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>
                            <Link to={'/events/new/'}>Create Event</Link>
                        </DropdownItem>
                        <DropdownItem>
                            Option 2
                        </DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem>
                            Reset
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                    <Link to="/presenters" className={'text-white'}>Presenter</Link>
                </NavItem>
                <NavItem>
                    <NavLink href="https://github.com/reactstrap/reactstrap" target="_blank"
                             className={'text-white'}>Audience</NavLink>
                </NavItem>
            </Nav>
        </Collapse>
    </Navbar>
};
export default OsvNavbar;
