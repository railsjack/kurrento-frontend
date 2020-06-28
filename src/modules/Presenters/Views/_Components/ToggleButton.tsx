import React, {useEffect, useState} from "react";
import '../_Styles/ToggleButton.css';

const ToggleButton = (props: any) => {
  const [status, setStatus] = useState(props.on)
  const onToggle = () => {
    const newStatus: any = !status;
    setStatus(newStatus);
    props.onToggle && props.onToggle(newStatus);
  }

  const onReceiveStatusByOutside = () => {
    setStatus(props.on);
  }
  useEffect(onReceiveStatusByOutside, [props.on])

  const toggleClass = status ? 'toggle-on' : 'toggle-off';
  return (
    <button
      onClick={onToggle}
      className={`toggle ${toggleClass}`}
    >{props.children}</button>
  );
}

export default ToggleButton;