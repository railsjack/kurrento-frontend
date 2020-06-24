import React from 'react';
import useEventsViewModel from "../ViewModels/Events/EventsViewModel";
import {Col, Container, Row} from "reactstrap";
import EventBoard from '../_Components/EventBoard';
import LoadingSpinner from "../../_CommonComponents/loading";

const ListEvents = (props: any) => {
    const view = useEventsViewModel({props});
    if (view.loading) return <LoadingSpinner/>;
    return (
        <Container fluid>
            <Row>
                {view.events && view.events.map((item: any, index: any) => {
                    return <EventBoard key={index} data={item} view={view}/>
                })}
                {view.events && (!view.loading && view.events.length == 0) && (
                    <Col md={8} sm={12} className={'offset-md-2 mt-5'}>
                        <h1 className={'text-center'}>No data exists.</h1>
                    </Col>
                )}
            </Row>
        </Container>
    )
};

export default ListEvents;
