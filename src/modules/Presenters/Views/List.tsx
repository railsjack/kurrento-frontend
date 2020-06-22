import React from 'react';
import useListViewModel from "../ViewModels/Presenters/ListViewModel";
import LoadingSpinner from "../../_CommonComponents/loading";
import {Col, Container, Row} from "reactstrap";
import PresenterWidget from '../_Components/PresenterWidget';

const List = (props: any) => {
    const view = useListViewModel({props});
    if (view.loading) return <LoadingSpinner/>;

    return (
        <Container>
            <Row className={'pt-5'}>
                <Col>
                    {view.presenters && view.presenters.map((item: any, index:number) => {
                        return <PresenterWidget view={view} data={item} key={index}/>
                    })}
                </Col>
            </Row>
        </Container>
    )
};
export default List;
