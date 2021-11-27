import { Component, useState } from "react";

const SideBarButton = ({ label, obj, clickHandler, dispStyle }) => {
  const [show, setShow] = useState(true);

  return (
    <button
      className={dispStyle}
      onClick={() => {
        setShow(!show);
        clickHandler({ sat: obj, show });
      }}
    >
      {`${show ? "Show" : "Hide"} ${label}`}
    </button>
  );
};

export default SideBarButton;
