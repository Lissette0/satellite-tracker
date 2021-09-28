// side nav component for satelitte filters
import React, {useState} from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from 'react-icons/ai';
import {Link} from 'react-router-dom';
import {SidebarData} from './SidebarData'
import './Sidebar.css'
import { IconContext } from 'react-icons';

//import styled from 'styled-components'


const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div id="sidebar">
                <Link to="#" className='menu-bars1'> 
                    <FaIcons.FaBars onClick = {showSidebar} />
                </Link>
                
                <nav className ={sidebar ? 'nav-menu1 active' : 'nav-menu1'}>
                    <ul className ='nav-menu-items1' onClick = {showSidebar}>

                        <li className = "navbar-toggle1">
                            <Link to="#" className= 'menu-bars1'>
                                <AiIcons.AiOutlineClose/>
                            </Link>
                        </li>
                        {SidebarData.map((item, index)=>{
                            return(
                                <li key={index} className={item.cName}>
                                    <Link to = {item.path}>
                                        {/* {item.icon} */}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>    
                </nav>
                </div>
            </IconContext.Provider>
        </>
    )
}

export default Sidebar
