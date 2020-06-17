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
                        Event
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>
                            <a href="/events/new">Create Event</a>
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
                    <NavLink href="/presenters" className={'text-white'}>Presenter</NavLink>
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
