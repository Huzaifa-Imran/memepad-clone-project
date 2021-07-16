import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <footer className='footer'>
            <div className='footer-div-1'>
                <ul>
                    <li><Link to="/terms">Terms & Conditions</Link></li>
                    <li><Link to="/privacy">Privacy Policy</Link></li>
                </ul>
            </div>
            <div className='footer-div-2'>
                <a href="https://www.fiverr.com/saleheen_noor" target="_blank" rel="noreferrer">2021 Saleheen Noor.</a>
            </div>
        </footer>
    )
}

export default Footer
