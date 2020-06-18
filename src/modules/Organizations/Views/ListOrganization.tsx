import React, {useState} from 'react';
import OsvNavbar from "../../_CommonComponents/OsvNavbar";
import {
    Button,
    Card, CardBody,
    CardHeader,
    Col,
    Collapse,
    Container, Fade,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from "reactstrap";
import CustomInput from "../../_CommonComponents/CustomInput";
import useOrganizationViewModel from "../ViewModels/Organizations/OrganizationsViewModel";
import ImageUploader from "react-images-upload";
import LoadingSpinner from '../../_CommonComponents/loading';

const ListOrganizations = (props: any) => {
    const view = useOrganizationViewModel({props});
    const orgInfo = view.orgInfo;
    const [timeout, setTimeout] = useState(300)
    const [fadeIn, setFadeIn] = useState(true)
    const [collapse, setCollapse] = useState(true)
    const toggle = () => {
        setCollapse(!collapse);
    }
    const toggleFade = () => {
        setFadeIn(!fadeIn);
    }

    if (view.loading) return <LoadingSpinner/>
    return <>
        <OsvNavbar/>
        <Container>
            <Row>
                {view.organizations.length > 0 && view.organizations.map((item: any, index: any) => {
                    return (<Col sm={6} md={6} className={'mt-5'} key={index}>
                        <Fade timeout={timeout} in={fadeIn}>
                            <Card>
                                <CardHeader>
                                    {item.name}
                                </CardHeader>
                                <Collapse isOpen={collapse} id="collapseExample">
                                    <CardBody>
                                        <p>Logo: <img src={item.logo_url} width={75} height={'auto'}
                                                      className={'ml-3'}/></p>
                                        <p>Background Images: {item.bg_images.map((image: any, key: any) => {
                                            return <img key={key} src={image} width={100} height={'auto'}
                                                        className={'ml-3'}/>
                                        })}</p>
                                        <p>Orgnization ID: {item.org_id}</p>
                                        <p>
                                            <Button size={'md'} color={'danger'}
                                                    className={'text-white pull-right mb-3 ml-3'}
                                                    onClick={(e) => view.deleteOrg(item.org_id)}>
                                                <i className={'fa fa-trash'}></i>&nbsp;&nbsp;Delete
                                            </Button>
                                            <Button size={'md'} color={'info'} className={'text-white pull-right mb-3'}
                                                    onClick={() => {
                                                        props.history.push('/organization/' + item.org_id + '/edit/')
                                                    }}>
                                                <i className={'fa fa-edit'}></i>&nbsp;&nbsp;Edit
                                            </Button>
                                        </p>
                                    </CardBody>
                                </Collapse>
                            </Card>
                        </Fade>
                    </Col>)
                })}
                {(!view.loading && view.organizations.length==0) && (
                    <Col md={8} sm={12} className={'offset-md-2 mt-5'}>
                        <h1 className={'text-center'}>No data exists.</h1>
                    </Col>
                )}
            </Row>
        </Container>
    </>
};
export default ListOrganizations;
