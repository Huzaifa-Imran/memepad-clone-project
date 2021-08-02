import memepad from "./memepad.json";
import GetBooty from "../../../images/getbooty.png";
import SmallGetBooty from "../../../images/smallBooty.png";
import ElonDoge from "../../../images/elon-doge.png";
import SmallElonDoge from "../../../images/smallElon.png";

export const projIds = ["booty"];

export const state = {
  booty: {
    launchContract: null,
    tokenContract: null,
    myAllocation: null,
    maxSwap: null,
    soldAmount: 0,
    soldAmountInBnb: 0,
    isFinished: false,
    auditStatus: "Passed",
    saleInUsd: 75000,
    totalRewardTokens: 8712121212121,
    totalTokensInBnb: 234,
    initialSupply: 4500000000000,
    totalSupply: 69000000000000,
    marketCap: 39150,
    tokenRate: 0.000000000026859,
    startTime: 1627797600,
    tokenUrl: memepad.prefix + memepad.booty.tokenAddress,
    address: memepad.booty.tokenAddress,
    name: "Booty Club",
    symbol: "BOOTY",
    decimals: 9,
    kyc: "No",
    image: GetBooty,
    smallImage: SmallGetBooty,
    description: "Booty Description",
  },
  elondoge: {
    launchContract: null,
    tokenContract: null,
    myAllocation: null,
    maxSwap: null,
    soldAmount: 197935425744305.47,
    soldAmountInBnb: 130.6,
    isFinished: true,
    auditStatus: "Passed",
    saleInUsd: 50000,
    totalRewardTokens: 200000000000000,
    totalTokensInBnb: 132,
    initialSupply: 400000000000000,
    totalSupply: 1000000000000000,
    marketCap: 39150,
    tokenRate: 0.00000000000066,
    startTime: 1621655940,
    tokenUrl: memepad.prefix + memepad.booty.tokenAddress,
    address: memepad.booty.tokenAddress,
    name: "ElonDoge",
    symbol: "EDOGE",
    decimals: 9,
    kyc: "No",
    image: ElonDoge,
    smallImage: SmallElonDoge,
    description: "Elondoge Description",
  },
};
