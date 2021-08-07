import memepad from "./memepad.json";
import smallElon from "../../../images/smallElon.png";
import smallMepad from "../../../images/staking-card-1.jpg";

export const stakeIds = ["mepad", "elondoge"];

export const stakingState = {
  mepadTokenContract: null,
  decimals: 18,
  staking: false,
  unstaking: false,
  mepadTokens: 0,
  mepad: {
    stakingContract: null,
    enabled: false,
    pendingReward: 0,
    stakedAmount: 0,
    rewardPerYear: 0,
    totalStakingTokens: 0,
    stakingUrl: memepad.prefix + memepad.mepad.stakingAddress + "#code",
    image: smallMepad,
    title: "MemePad Staking",
    subTitle: "Stake MEPAD, Earn MEPAD",
    symbol: "MEPAD",
  },
  elondoge: {
    stakingContract: null,
    enabled: false,
    pendingReward: 0,
    stakedAmount: 0,
    rewardPerYear: 0,
    totalStakingTokens: 0,
    stakingUrl: memepad.prefix + memepad.elondoge.stakingAddress + "#code",
    image: smallElon,
    title: "Elondoge Staking",
    subTitle: "Stake MEPAD, Earn EDOGE",
    symbol: "EDOGE",
  },
};
