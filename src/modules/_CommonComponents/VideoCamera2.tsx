import {Col} from "reactstrap";
import React from "react";

const VideoCamera = (props: any) => {
  return <video style={props.style} autoPlay loop controls muted width={'100%'}>
    <source src="https://mdbootstrap.com/img/video/Sail-Away.mp4" type="video/mp4"/>
  </video>;
};
export default VideoCamera;
