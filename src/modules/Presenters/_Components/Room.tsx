import React, {useEffect} from 'react'
import {Col, Row} from "reactstrap";

const Room = (props: any) => {
    console.log(props.data);
    return (
        <Col md={4}>
            <div className="embed-responsive embed-responsive-16by9">
                <video autoPlay={true} muted={true} id={props.data.id}></video>
            </div>
        </Col>
    )
};
export default Room;
