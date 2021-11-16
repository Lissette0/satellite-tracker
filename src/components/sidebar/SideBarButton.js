import { Component, useState } from "react";

const SideBarButton = ({ label, obj, clickHandler, dispStyle }) => {
  const [active, setActive] = useState(false);

  return (
    <button
      className={dispStyle}
      onClick={() => {
        clickHandler(active, obj);
        setActive(!active);
      }}
    >
      {`${!active ? "Show" : "Hide"} ${label}`}
    </button>
  );
};

export default SideBarButton;
