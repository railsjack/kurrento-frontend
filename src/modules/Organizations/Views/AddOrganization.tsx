import React, {useState} from 'react';
import OsvNavbar from "../../_CommonComponents/OsvNavbar";
import {Button, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import CustomInput from "../../_CommonComponents/CustomInput";
import useOrganizationViewModel from "../ViewModels/Organizations/OrganizationsViewModel";
import ImageUploader from "react-images-upload";

const AddEvents = (props: any) => {
    const view = useOrganizationViewModel({props});
    const orgInfo = view.orgInfo;
    const onEventInfoChanged = (e: any) => {
        const {name, value} = e.target;
        orgInfo[name] = value;
    };
    const onLogoImgDrop = (pictureFiles: any, pictureDataURLs: any) => {
        orgInfo['logo_url'] = pictureDataURLs[0];
    };
    const onBgImgDrop = (pictureFiles: any, pictureDataURLs: any) => {
        orgInfo['bg_images'] = pictureDataURLs;
    };
    return <>
        <OsvNavbar/>
        <Container>
            <Row>
                <Col sm={12} md={6} className={'offset-md-3 mt-5'}>
                    <CustomInput.Text label={'Org Name'} name={'name'} onChange={onEventInfoChanged} value={orgInfo.name}/>
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose Logo Image of Org'
                        onChange={onLogoImgDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                        withLabel={true}
                        singleImage={true}
                        withPreview={true}
                    />
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose Bg images of Org'
                        onChange={onBgImgDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                        withLabel={true}
                        withPreview={true}
                    />
                    <div className={'form-row mt-3'}>
                        <Button type={'button'} size="md" color="primary" className={'mx-auto'}
                                onClick={() => view.saveOrg()}>
                            <i className={'fa fa-save'}/>&nbsp;&nbsp;Save</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    </>
};
export default AddEvents;
