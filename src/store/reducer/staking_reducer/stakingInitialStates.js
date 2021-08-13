import memepad from "./memepad.json";
import smallElon from "../../../images/smallElon.png";
import smallMepad from "../../../images/staking-card-1.jpg";

export const stakeIds = ["mepad", "mepad2"];

//Initial values of the stake, used when metamask is not connected.
//When metamask is connected, these values will update based on the contract.
export const stakingState = {
  mepadTokenContract: null,
  decimals: 18,
  mepadTokens: 0,
  mepad: {
    stakingContract: null,
    enabled: false,
    pendingReward: 0,
    stakedAmount: 0,
    rewardPerYear: 0,
    totalStakingTokens: 0,
    stakingUrl: memepad.prefix + memepad.mepad.stakingAddress + "#code", //Constant, not affected by metamask
    image: smallMepad, //Constant, not affected by metamask
    title: "MemePad Staking", //Constant, not affected by metamask
    subTitle: "Stake MEPAD, Earn MEPAD", //Constant, not affected by metamask
    symbol: "MEPAD", //Constant, not affected by metamask
    isCompleted: false,
  },
  mepad2: {
    stakingContract: null,
    enabled: false,
    pendingReward: 0,
    stakedAmount: 0,
    rewardPerYear: 0,
    totalStakingTokens: 0,
    stakingUrl: memepad.prefix + memepad.mepad2.stakingAddress + "#code", //Constant, not affected by metamask
    image: smallMepad, //Constant, not affected by metamask
    title: "MemePad2 Staking", //Constant, not affected by metamask
    subTitle: "Stake MEPAD2, Earn MEPAD2", //Constant, not affected by metamask
    symbol: "MEPAD2", //Constant, not affected by metamask
    isCompleted: true, //This value got fetched from contract and became false eventually
  },
};
