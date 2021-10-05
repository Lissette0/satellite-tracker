import React, {useState} from 'react';
import './Sidebar.css';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { IoChevronBack } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import { RiFilterOffFill } from "react-icons/ri";
import { FiChevronDown} from "react-icons/fi";
import { GiHamburgerMenu} from "react-icons/gi";

const CloseNav = styled.div`
    background: #2F303A;
    width: 80px;
    height:100vh;
    display: flex; 
    justify-content: flex-start;
`;

const NavIcon = styled(Link)`
    margin-left: 2rem;
    font-size: 2rem;
    height: 80px;
    color: white;
    display:flex;
    justify-content: flex-start;
    align-items:center;
`;

const NavIcon1 = styled(Link)`
    float:right;
    color: white;
    margin: 8px 8px 8px 8px;
    font-size: 2rem;
`;

const SidebarNav = styled.nav`
    background: #2F303A;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    height:100vh;
    width: 25%;
    position: fixed;
    top:80px;
    left: ${({sidebar}) => (sidebar ? '0' : '-100%')};
    transition: 400ms;
    z-index: 10;

`;

 const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
        <div id = 'sidebar'>
            <CloseNav>
                <NavIcon to='#'> 
                    <GiHamburgerMenu id = "sidecloseIcon" onClick={showSidebar}/> 
                </NavIcon>
            </CloseNav>
            <SidebarNav sidebar = {sidebar}>
                    <NavIcon1 to='#' >
                        <IoChevronBack onClick={showSidebar} />
                    </NavIcon1>
                    <input id='input' type="text" name="name"  autoComplete="off" placeholder='Satellite Name' />
            <div id = 'content'>
                <div className="labels"> <FaFilter id= 'filterIcon'/> Filter Collections</div>
                <hr></hr>
                <div className="labels" id='clear'>Categories <RiFilterOffFill id= 'clearIcon'/>
                    {/* <span class="tooltiptext">Clear Filter</span> */}
                </div>
                <hr></hr>
                <div className="labels labels1" id='clear'>Organizations <FiChevronDown id= 'dropIcon'/></div>
                <hr></hr>
                <div className="labels labels1" id='clear'>Features <FiChevronDown id= 'dropIcon'/></div>
                <hr></hr>
                <div className="labels labels1" id='clear'>Type <FiChevronDown id= 'dropIcon'/></div>
                <hr></hr>

            </div>
        </SidebarNav>
        </div>
    </>
    )
}

export default Sidebar
