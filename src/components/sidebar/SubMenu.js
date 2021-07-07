import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(NavLink)`
  display: flex;
  background-color:  #FFFFFF;
  background-position: 0% 0%;
  color: #141617;
  transition: all .15s ease-in;
  border-radius: 7.5px;
  text-decoration: none solid rgb(20, 22, 23);
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 45px;
  margin-bottom: 10px;
  text-decoration: none;
  font-size: 18px;
  ${'' /* background-color:  #0078FF; */}
  &:hover {
    opacity: .75;
    color: #141617;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.1s ease 0.1s;
    color: black
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const SubMenu = ({ item }) => {

  return (
    <>
      <SidebarLink activeStyle={{
        backgroundColor: '#0078FF',
        cursor: 'pointer',
        color: 'white',
        textDecoration: 'none',
        transition: 'all 0.25s ease 0.2s'
      }}
        to={item.path}
        onClick={item.subNav}>
        <div className='pl-2' >
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
      </SidebarLink>
    </>
  );
};

export default SubMenu;