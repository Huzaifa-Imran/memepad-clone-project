import memepad from "./memepad.json";
import GetBooty from "../../../images/getbooty.png";
import SmallGetBooty from "../../../images/smallBooty.png";
import ElonDoge from "../../../images/elon-doge.png";
import SmallElonDoge from "../../../images/smallElon.png";

export const projIds = ["booty", "booty2", "elondoge"];

//Initial values of the IDO, used when metamask is not connected.
//When metamask is connected, these values will update based on the contract.
//Constant values wont be updated, make sure you set these correctly.
export const projState = {
  booty: {
    launchContract: null,
    tokenContract: null,
    myAllocation: null,
    maxSwap: null,
    soldAmount: 0,
    soldAmountInBnb: 0,
    isFinished: false,
    redeemed: false,
    auditStatus: "Passed", //Constant
    saleInUsd: 75000, //Constant
    totalRewardTokens: 8712121212121,
    totalTokensInBnb: 234,
    initialSupply: 4500000000000,
    totalSupply: 69000000000000,
    marketCap: 39150, //Constant
    tokenRate: 0.000000000026859,
    startTime: 1628780400,
    tokenUrl: memepad.prefix + memepad.booty.tokenAddress, //Constant
    address: memepad.booty.tokenAddress, //Constant
    name: "Booty Club", //Constant
    symbol: "BOOTY",
    decimals: 9,
    kyc: "No", //Constant
    image: GetBooty, //Constant
    smallImage: SmallGetBooty, //Constant
    description: "Booty Description", //Constant
  },
  booty2: {
    launchContract: null,
    tokenContract: null,
    myAllocation: null,
    maxSwap: null,
    soldAmount: 0,
    soldAmountInBnb: 0,
    isFinished: false,
    redeemed: false,
    auditStatus: "Passed", //Constant
    saleInUsd: 75000, //Constant
    totalRewardTokens: 8712121212121,
    totalTokensInBnb: 234,
    initialSupply: 4500000000000,
    totalSupply: 69000000000000,
    marketCap: 39150, //Constant
    tokenRate: 0.000000000026859,
    startTime: 1628780400,
    tokenUrl: memepad.prefix + memepad.booty2.tokenAddress, //Constant
    address: memepad.booty2.tokenAddress, //Constant
    name: "Booty2 Club", //Constant
    symbol: "BOOTY2",
    decimals: 9,
    kyc: "No", //Constant
    image: GetBooty, //Constant
    smallImage: SmallGetBooty, //Constant
    description: "Booty2 Description", //Constant
  },
  elondoge: {
    launchContract: null,
    tokenContract: null,
    myAllocation: null,
    maxSwap: null,
    soldAmount: 197935425744305.47,
    soldAmountInBnb: 130.6,
    isFinished: true, // this property updates when connected with metamask, since the contract sale is live, it changed from true to false after connecting the wallet
    redeemed: false,
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
