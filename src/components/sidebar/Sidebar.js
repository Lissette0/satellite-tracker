import React, {useState} from 'react';
import Search from './Search';
import './Sidebar.css';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { IoChevronBack } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import { RiFilterOffFill } from "react-icons/ri";
import { FiChevronDown} from "react-icons/fi";
import { FaSatellite} from "react-icons/fa";

const CloseNav = styled.div`
    background: #2F303A;
    width: 80px;
    height:100vh;
    display: flex; 
    justify-content: flex-start;
    display:flex;
    flex-direction:column;
`;

const NavIcon2 = styled(Link)`
    margin-left: 15px;
    font-size: 2rem;
    position:relative;
    height: 100px;
    color: white;
    height: 50px;
    display:flex;
    justify-content: flex-start;
    align-items:center;
`;

const NavIcon = styled(Link)`
    margin-left: 15px;
    position:relative;
    font-size: 2rem;
    height: 50px;
    color: white;
    display:flex;
    justify-content: flex-start;
    align-items:center;

`;

const NavIcon1 = styled(Link)`
    float: right;
    color: white;
    font-size: 2rem;
    position: relative; 
    
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
    justify-content: flex-start;
    display:flex;
    flex-direction:column;

`;

const SidebarNav2 = styled.nav`
    background: #2F303A;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    height:100vh;
    width: 25%;
    position: fixed;
    top:80px;
    left: ${({sidebar2}) => (sidebar2 ? '0' : '-100%')};
    transition: 400ms;
    z-index: 10;

`;



 const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const [sidebar2, setSidebar2] = useState(false);
    const showSidebar2 = () => setSidebar2(!sidebar2);

    return (
        <>
        <div id = 'sidebar'>
            <CloseNav>
                <NavIcon to='#'> 
                    <FaSatellite className = "sidecloseIcon" onClick={showSidebar2} />
                </NavIcon>
                <NavIcon2 to='#'> 
                    <FaFilter className = "sidecloseIcon" onClick={showSidebar} />  
                </NavIcon2>
            </CloseNav>

            <SidebarNav2 sidebar2 = {sidebar2}>
                    <NavIcon1 to='#' >
                        <IoChevronBack style ={{margin: "8px 8px 8px 8px"}} onClick={showSidebar2} className="icon" id= "back-icon"/>
                    </NavIcon1>
                    <Search/>
                    {/* <div id = 'content'>
                        
                    </div> */}
            </SidebarNav2>


            <SidebarNav sidebar = {sidebar}>
                    <NavIcon1 to='#' >
                        <IoChevronBack style ={{margin: "8px 8px 0px 0px"}} onClick={showSidebar} className="icon"  id= "back-icon"/>
                    </NavIcon1>
                    {/* <input id='input' type="text" name="name"  autoComplete="off" placeholder='Satellite Name' /> */}
                    <div id = 'filter-content'>
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
