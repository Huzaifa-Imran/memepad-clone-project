import React from 'react';
import * as RiIcons from 'react-icons/ri';
import { BiRocket } from "react-icons/bi";

export const SidebarData = [
  {
    title: 'Projects',
    path: '/projects',
    icon: <BiRocket />,
  },
  {
    title: 'Stacking',
    path: '/staking',
    icon: <RiIcons.RiCoinFill />,
  },
];