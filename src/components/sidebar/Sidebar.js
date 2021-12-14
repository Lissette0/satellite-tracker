import React, { useState } from "react";
import Search from "./Search";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoChevronBack } from "react-icons/io5";
// import { FaFilter } from "react-icons/fa";
// import { RiFilterOffFill } from "react-icons/ri";
// import { FiChevronDown } from "react-icons/fi";
import { FaSatellite } from "react-icons/fa";
import { FaGalacticRepublic } from "react-icons/fa";
import SearchDebris from "./SearchDebris";

const CloseNav = styled.div`
  background: #2f303a;
  width: 80px;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  display: flex;
  flex-direction: column;
`;

const NavIcon2 = styled(Link)`
  font-size: 2rem;
  position: relative;
  height: 100px;
  color: white;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  position: relative;
  font-size: 2rem;
  height: 50px;
  color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon1 = styled(Link)`
  float: right;
  color: white;
  font-size: 2rem;
  position: relative;
`;

const SidebarNav = styled.nav`
  background: #2f303a;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  height: 100vh;
  width: 25%;
  position: fixed;
  top: 80px;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 400ms;
  z-index: 10;
  justify-content: flex-start;
  display: flex;
  flex-direction: column;
`;

const SidebarNav2 = styled.nav`
  background: #2f303a;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  height: 100vh;
  width: 25%;
  position: fixed;
  top: 80px;
  left: ${({ sidebar2 }) => (sidebar2 ? "0" : "-100%")};
  transition: 400ms;
  z-index: 10;
`;

const Sidebar = ({ addSat, visibilityHandler,pathHandler }) => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const [sidebar2, setSidebar2] = useState(false);
  const showSidebar2 = () => setSidebar2(!sidebar2);

  return (
    <>
      <div id="sidebar">
        <CloseNav>
          <NavIcon to="#">
            <FaSatellite
              className="sidecloseIcon hovericon"
              onClick={showSidebar2}
            />
          </NavIcon>
          <NavIcon2 to="#">
            <FaGalacticRepublic
              className="sidecloseIcon hovericon"
              onClick={showSidebar}
            />
          </NavIcon2>
        </CloseNav>

        <SidebarNav2 sidebar2={sidebar2}>
          <NavIcon1 to="#">
            <IoChevronBack
              style={{ margin: "8px 8px 8px 8px" }}
              onClick={showSidebar2}
              className="icon"
              id="back-icon"
            />
          </NavIcon1>
          <Search addSat={addSat} visibilityHandler={visibilityHandler} pathHandler={pathHandler}/>
          {/* <div id = 'content'>

                    </div> */}
        </SidebarNav2>

        <SidebarNav sidebar={sidebar}>
          <NavIcon1 to="#">
            <IoChevronBack
              style={{ margin: "8px 8px 0px 0px" }}
              onClick={showSidebar}
              className="icon"
              id="back-icon"
            />
          </NavIcon1>
          <SearchDebris  />
        </SidebarNav>
      </div>
    </>
  );
};

export default Sidebar;
