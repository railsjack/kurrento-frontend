import React, {useState} from 'react';
import {Button, Col, Container, FormGroup, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import CustomInput from "../../_CommonComponents/CustomInput";
import Settings from "../_Components/Settings";
import Theme from "../_Components/Theme";
import Stage from "../_Components/Stage";
import useEventsViewModel from "../ViewModels/Events/EventsViewModel";

const AddEvents = (props: any) => {
    const view = useEventsViewModel({props});
    const eventInfo = view.eventInfo;
    const onEventInfoChanged = (e: any) => {
        const {name, value} = e.target;
        eventInfo[name] = value;
    };
    const [activeTab, setActiveTab] = useState(new Array(4).fill('1'));
    const tabPane = () => {
        return (
            <>
                <TabPane tabId="1">
                    <Settings view={view}/>
                </TabPane>
                <TabPane tabId="2">
                    <Theme view={view}/>
                </TabPane>
                <TabPane tabId="3">
                    <Stage view={view}/>
                </TabPane>
            </>
        );
    };
    const toggle = (tabPane: any, tab: any) => {
        const newArray = activeTab.slice();
        newArray[tabPane] = tab;
        setActiveTab(newArray);
    };

    return <>
        <Container>
            <Row>
                <Col sm={12} md={6} className={'offset-md-3 mt-5'}>
                    <CustomInput.Text label={'Event'} onChange={onEventInfoChanged} value={eventInfo.name} name="name"/>
                    <CustomInput.Select label={'Organization'} name="org_id" onChange={onEventInfoChanged}
                                        value={eventInfo.org_id} firstOptionText={'--Select--'}
                                        optionsData={view.organizations}>

                    </CustomInput.Select>
                    <Nav tabs className={'mt-5'}>
                        <NavItem>
                            <NavLink
                                active={activeTab[0] === '1'}
                                onClick={() => {
                                    toggle(0, '1');
                                }}
                            >
                                Settings
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={activeTab[0] === '2'}
                                onClick={() => {
                                    toggle(0, '2');
                                }}
                            >
                                Theme
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={activeTab[0] === '3'}
                                onClick={() => {
                                    toggle(0, '3');
                                }}
                            >
                                Stages
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab[0]}>
                        {tabPane()}
                    </TabContent>
                    <div className={'form-row mt-3'}>
                        <Button type={'button'} size="md" color="primary" className={'mx-auto'}
                                onClick={() => view.saveEvent()}>
                            <i className={'fa fa-save'}/>&nbsp;&nbsp;Save</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    </>
};
export default AddEvents;
