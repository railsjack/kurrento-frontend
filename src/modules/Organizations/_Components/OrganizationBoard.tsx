import React, {useState} from 'react';
import {Button, Card, CardBody, CardHeader, Col, Collapse, Fade} from "reactstrap";

const OrganizationBoard = (props: any) => {
    const org = props.data;
    const view = props.view;
    const [timeout, setTimeout] = useState(300);
    const [fadeIn, setFadeIn] = useState(true);
    const [collapse, setCollapse] = useState(true);
  return (
      <Col sm={6} md={6} className={'mt-5'}>
          <Fade timeout={timeout} in={fadeIn}>
              <Card>
                  <CardHeader>
                      {org.name}
                  </CardHeader>
                  <Collapse isOpen={collapse} id="collapseExample">
                      <CardBody>
                          <p>Logo: <img src={org.logo_url} width={75} height={'auto'}
                                        className={'ml-3'}/></p>
                          <p>Background Images: {org.bg_images.map((image: any, key: any) => {
                              return <img key={key} src={image} width={100} height={'auto'}
                                          className={'ml-3'}/>
                          })}</p>
                          <p>Orgnization ID: {org.org_id}</p>
                          <p>
                              <Button size={'md'} color={'danger'}
                                      className={'text-white pull-right mb-3 ml-3'}
                                      onClick={(e) => view.deleteOrg(org.org_id)}>
                                  <i className={'fa fa-trash'}></i>&nbsp;&nbsp;Delete
                              </Button>
                              {/*<Button size={'md'} color={'info'} className={'text-white pull-right mb-3'}*/}
                              {/*        onClick={() => {*/}
                              {/*            props.history.push('/organization/' + item.org_id + '/edit/')*/}
                              {/*        }}>*/}
                              {/*    <i className={'fa fa-edit'}></i>&nbsp;&nbsp;Edit*/}
                              {/*</Button>*/}
                          </p>
                      </CardBody>
                  </Collapse>
              </Card>
          </Fade>
      </Col>
  )
};
export default OrganizationBoard;
