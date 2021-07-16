import { useState, useEffect } from 'react';
import * as RiIcons from 'react-icons/ri';

function Header(props) {
    const [toggle, setToggle] = useState(false);
    // useEffect(() => {
    //     console.log(props.location);
    //     console.log(window.location.pathname)
    // }, [])
    return (
        <div>
            <nav className="navbar navbar-expand-lg nav-fixed-1025 nav-header">
                <div className='header-left-div' >
                    <span className={`menu-btn mx-3 `} id="menu-toggle" onClick={() => setToggle(!toggle)}><RiIcons.RiMenu2Line /></span>
                    <span className='header-title'>Projects</span>
                </div>
                <div className='ml-auto nav-btn mr-4'>
                    <button className="user-btn">
                        Connect Wallet
                    </button>

                </div>
            </nav>
        </div>
    )
}

export default Header
