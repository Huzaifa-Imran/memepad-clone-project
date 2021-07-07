import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SidebarData } from '../sidebar/SidebarData';
import SubMenu from '../sidebar/SubMenu';
import '../Projects/Projects.css';
import './Sidebar.css';
import * as RiIcons from 'react-icons/ri';
import * as FiIcons from "react-icons/fa";
import BSCSCAN from '../../images/bscscan.png';
import pancakeswap from '../../images/pancakeswap-cake-logo.png';
import logo from '../../images/mempad-logo.svg';


const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #FFFFFF;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 80%;
  margin: 0 auto;
`;

function Sidebar() {

  return (
    <div className='sidebar-display'>
      <div className='sidebar-display-top'>

        <div className="sidebar-heading mt-2 text-center">
          <img src={logo} alt="" />
        </div>



        <div className="list-group list-group-flush mt-3 d-flex">
          <SidebarWrap>
            {/* <NavIcon to='#'>
          </NavIcon> */}
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </div>

      </div>

      <div>

        <SidebarWrap>
          <div className='slider-bottom-stamp'>
              <div className='slider-bottom-stamp-img'>
                <img src={pancakeswap} alt="" width='30' height='30'/>
              </div>
              <div className='slider-bottom-stamp-text'>
                <span className='' >MEPAD Tokens Available On</span>
                <span className=''>PancakeSwap</span>
              </div>
          </div>
        </SidebarWrap>


        <div>
          <div className='sidebar-media-icons'>
            <span>
              <RiIcons.RiTwitterFill />
            </span>
            <span>
              <RiIcons.RiSendPlaneFill />
            </span>
            <span>
              <FiIcons.FaMediumM />
            </span>
            <span>
              <img src={BSCSCAN} alt="" width="16" height="16" />
            </span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 253.414 256">
                <g id="bunny-grey" transform="translate(-1)">
                  <path id="Path_20" data-name="Path 20" d="M46.443,40.014a33.808,33.808,0,1,1,67.042-6.206v41.68q7.006-.494,14.222-.5,6.926,0,13.671.461V33.808a33.808,33.808,0,1,1,67.042,6.206l-9.149,48.993c31.4,13.709,55.142,37.518,55.142,67.437v18.1c0,24.6-16.277,45.2-39.032,59.109C192.449,247.668,161.427,256,127.707,256s-64.743-8.332-87.675-22.346C17.277,219.749,1,199.149,1,174.545v-18.1c0-29.76,23.5-53.478,54.634-67.214Zm141.1,55.43,10.705-57.328a23.465,23.465,0,1,0-46.531-4.308V86.849q-5.093-.653-10.343-1.03-6.726-.481-13.671-.486-7.222,0-14.222.526-5.247.391-10.343,1.062V33.808a23.465,23.465,0,1,0-46.531,4.308L67.352,95.634c-33.579,12.473-56.009,35.041-56.009,60.81v18.1c0,39.274,52.1,71.111,116.364,71.111s116.364-31.837,116.364-71.111v-18.1C244.071,130.543,221.412,107.877,187.548,95.444Z" fill="#7e7d7d" fill-rule="evenodd" />
                  <path id="Path_21" data-name="Path 21" d="M241.727,139.1c0,39.274-52.1,71.111-116.364,71.111S9,178.375,9,139.1V121H241.727Z" transform="translate(2.343 35.444)" fill="#f5f7f8" />
                  <path id="Path_22" data-name="Path 22" d="M54.267,35.772A23.465,23.465,0,1,1,100.8,31.465V84.577a190.9,190.9,0,0,1,48.581-.072V31.465a23.465,23.465,0,1,1,46.531,4.308L185.2,93.1c33.864,12.433,56.523,35.1,56.523,61,0,39.274-52.1,71.111-116.364,71.111S9,193.375,9,154.1c0-25.769,22.429-48.337,56.009-60.81Z" transform="translate(2.343 2.343)" fill="#77838f" fill-rule="evenodd" />
                  <path id="Path_23" data-name="Path 23" d="M79.859,121.394c0,10.711-5.789,19.394-12.929,19.394S54,132.1,54,121.394,59.789,102,66.929,102,79.859,110.683,79.859,121.394Z" transform="translate(15.525 29.879)" fill="#f5f7f8" />
                  <path id="Path_24" data-name="Path 24" d="M148.859,121.394c0,10.711-5.788,19.394-12.929,19.394S123,132.1,123,121.394,128.788,102,135.929,102,148.859,110.683,148.859,121.394Z" transform="translate(35.737 29.879)" fill="#f5f7f8" />
                </g>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
