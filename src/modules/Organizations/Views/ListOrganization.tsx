import React from 'react';
import {
    Col,
    Container,
    Row,
} from "reactstrap";
import useOrganizationViewModel from "../ViewModels/Organizations/OrganizationsViewModel";
import LoadingSpinner from '../../_CommonComponents/loading';
import OrganizationBoard from "../_Components/OrganizationBoard";

const ListOrganizations = (props: any) => {
    const view = useOrganizationViewModel({props});

    if (view.loading) return <LoadingSpinner/>
    return <>
        <Container>
            <Row>
                {view.organizations && view.organizations.map((item: any, index: any) => {
                    return (<OrganizationBoard view={view} data={item} key={index}/>)
                })}
                {(!view.loading && view.organizations.length == 0) && (
                    <Col md={8} sm={12} className={'offset-md-2 mt-5'}>
                        <h1 className={'text-center'}>No data exists.</h1>
                    </Col>
                )}
            </Row>
        </Container>
    </>
};
export default ListOrganizations;
