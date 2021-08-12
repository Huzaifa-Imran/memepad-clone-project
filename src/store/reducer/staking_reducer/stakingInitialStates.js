import memepad from "./memepad.json";
import smallElon from "../../../images/smallElon.png";
import smallMepad from "../../../images/staking-card-1.jpg";

export const stakeIds = ["mepad", "elondoge"];

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
    symbol: "MEPAD",
    isCompleted: false,
  },
  elondoge: {
    stakingContract: null,
    enabled: false,
    pendingReward: 0,
    stakedAmount: 0,
    rewardPerYear: 0,
    totalStakingTokens: 0,
    stakingUrl: memepad.prefix + memepad.elondoge.stakingAddress + "#code", //Constant, not affected by metamask
    image: smallElon, //Constant, not affected by metamask
    title: "Elondoge Staking", //Constant, not affected by metamask
    subTitle: "Stake MEPAD, Earn EDOGE", //Constant, not affected by metamask
    symbol: "EDOGE",
    isCompleted: false,
  },
};
