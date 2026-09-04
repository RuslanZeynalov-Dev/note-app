import React from 'react'
import {PiNotepadThin} from "react-icons/pi";
import "./myheader.css"
import Spacer from './Spacer';

function Header() {
    
  return (
    <div className='header-container below-shadow'>

            <div className='side left-side'>
                <PiNotepadThin className='icon' />
                <span className='text bold-text'>Simple</span> <span className='text blue-text'>Notes</span>
            </div>

            <Spacer />       

            <div className='side right-side'>
                {/*<button className={"button transparent"}>*/}
                {/*    <PiUserCircleThin className='icon'/>*/}
                {/*</button>*/}

                {/*<button className={"button transparent"}>*/}

                {/*    <CiSettings className='icon'/>*/}
                {/*</button>*/}
                {/*<button className={"button transparent"}>*/}

                {/*    <CiMenuBurger className='icon' id={"nav-menu-button"}/>*/}
                {/*</button>*/}

            </div>
            
    </div>
  )
}

export default Header

