import React from 'react';
import * as RiIcons from 'react-icons/ri';
import { BiRocket } from "react-icons/bi";

export const SidebarData = [
  {
    title: 'Projects',
    path: '/dashboard/projects',
    icon: <BiRocket />,
  },
  {
    title: 'Staking',
    path: '/dashboard/staking',
    icon: <RiIcons.RiCoinFill />,
  },
];