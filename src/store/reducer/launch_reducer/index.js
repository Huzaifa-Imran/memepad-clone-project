import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import memepad from "./memepad.json";
import Web3 from "web3";
import Safedot from "../../../images/safedot.png";
import SmallSafedot from "../../../images/smallSafe.jpg";
import { projIds, state } from "./projectInitialStates";

export const initializeLaunches = createAsyncThunk(
  "InitializeLaunches",
  async (action, thunkAPI) => {
    for (let i = 0; i < projIds.length; ++i) {
      thunkAPI.dispatch(initializeProject(projIds[i]));
    }
  }
);

export const initializeProject = createAsyncThunk(
  "InitializeProject",
  async (action, thunkAPI) => {
    await thunkAPI.dispatch(initLaunchContract(action));
    await thunkAPI.dispatch(initLaunchInfo(action));
    await thunkAPI.dispatch(loadLaunchInfo(action));
  }
);

export const initLaunchContract = createAsyncThunk(
  "InitLaunchContract",
  async (action, thunkAPI) => {
    try {
      const web3 = thunkAPI.getState().web3.web3;
      const binanceChainId = memepad.network;
      const chainId = await web3.eth.getChainId();
      if (chainId !== binanceChainId)
        // eslint-disable-next-line
        throw "Please Connect to Binance Smart Chain";
      const launchContract = new web3.eth.Contract(
        memepad[action].launchAbi,
        memepad[action].launchAddress
      );
      const tokenContract = new web3.eth.Contract(
        memepad[action].tokenAbi,
        memepad[action].tokenAddress
      );
      return {
        launchContract,
        tokenContract,
        projId: action,
      };
    } catch (error) {
      console.log("Error initializing contract: ", error);
      throw error;
    }
  }
);

export const initLaunchInfo = createAsyncThunk(
  "InitLaunchInfo",
  async (action, thunkAPI) => {
    try {
      const { tokenContract, launchContract } =
        thunkAPI.getState().launch[action];
      const decimals = Number(await tokenContract.methods.decimals().call());
      const removeDecimals = (val) => {
        return Number(val) / 10 ** decimals;
      };
      const responses = await Promise.all([
        tokenContract.methods.totalSupply().call(),
        launchContract.methods.totalRewardTokens().call(),
        launchContract.methods.tokenRate().call(),
        launchContract.methods.startTime().call(),
      ]);
      const totalTokensInBnb = await launchContract.methods
        .getTokenInBNB(removeDecimals(responses[1]))
        .call();

      return {
        totalSupply: removeDecimals(responses[0]),
        totalRewardTokens: removeDecimals(responses[1]),
        totalTokensInBnb: removeDecimals(totalTokensInBnb),
        tokenRateInBnb: removeDecimals(removeDecimals(responses[2])),
        startTime: Number(responses[3]),
        decimals,
        projId: action,
      };
    } catch (error) {
      console.log("Error initializing launch info:", error);
      throw error;
    }
  }
);

export const swapTokens = createAsyncThunk(
  "SwapTokens",
  async (action, thunkAPI) => {
    try {
      const { launchContract, decimals } =
        thunkAPI.getState().launch[action.id];
      const { address } = thunkAPI.getState().web3;
      await launchContract.methods
        .buyTokens()
        .send({ from: address, value: Web3.utils.toWei(action.amount) });
      thunkAPI.dispatch(loadLaunchInfo(action.id));
    } catch (error) {
      console.log("Error swapping tokens:", error);
      throw error;
    }
  }
);

export const redeemTokens = createAsyncThunk(
  "SwapTokens",
  async (action, thunkAPI) => {
    try {
      const { launchContract } =
        thunkAPI.getState().launch[action.id];
      const { address } = thunkAPI.getState().web3;
      await launchContract.methods
        .redeemTokens()
        .send({ from: address });
      thunkAPI.dispatch(loadLaunchInfo(action.id));
    } catch (error) {
      console.log("Error redeeming tokens:", error);
      throw error;
    }
  }
);

export const loadLaunchInfo = createAsyncThunk(
  "LoadLaunchInfo",
  async (action, thunkAPI) => {
    try {
      const { launchContract, decimals, tokenRateInBnb } = thunkAPI.getState().launch[action];
      const { address } = thunkAPI.getState().web3;

      const removeDecimals = (val) => {
        return Number(val) / 10 ** decimals;
      };
      const responses = await Promise.all([
        launchContract.methods.soldAmount().call(),
        launchContract.methods.getWhitelist(address).call(),
        launchContract.methods.isFinished().call(),
      ]);
      const soldAmountInBnb = removeDecimals(responses[0] * tokenRateInBnb);
      return {
        soldAmountInBnb,
        soldAmount: removeDecimals(responses[0]),
        myAllocation: Number(responses[1]["_amount"])/(10**18),
        maxSwap: removeDecimals(
          responses[1]["_maxPayableAmount"] - responses[1]["_rewardedAmount"]
        ),
        redeemed: Boolean(responses[1]["_redeemed"]),
        isFinished: Boolean(responses[2]),
        projId: action,
      };
    } catch (error) {
      console.log("Error in loading launch info:", error);
      throw error;
    }
  }
);

const launchSlice = createSlice({
  name: "launchReducer",
  initialState: state,
  extraReducers: {
    [initLaunchContract.fulfilled]: (state, action) => {
      const projId = action.payload.projId;
      state[projId].launchContract = action.payload.launchContract;
      state[projId].tokenContract = action.payload.tokenContract;
    },
    [initLaunchInfo.fulfilled]: (state, action) => {
      console.log("initLaunch fulfilled");
      const projId = action.payload.projId;
      state[projId].totalSupply = action.payload.totalSupply;
      state[projId].totalRewardTokens = action.payload.totalRewardTokens;
      state[projId].totalTokensInBnb = action.payload.totalTokensInBnb;
      state[projId].tokenRate = action.payload.tokenRateInBnb;
      console.log("start: ", action.payload.startTime);
      state[projId].startTime = action.payload.startTime;
      state[projId].decimals = action.payload.decimals;
    },
    [loadLaunchInfo.fulfilled]: (state, action) => {
      console.log("loadLaunch fulfilled");
      const projId = action.payload.projId;
      state[projId].soldAmountInBnb = action.payload.soldAmountInBnb;
      state[projId].soldAmount = action.payload.soldAmount;
      state[projId].isFinished = action.payload.isFinished;
      state[projId].myAllocation = action.payload.myAllocation;
      state[projId].maxSwap = action.payload.maxSwap;
      state[projId].redeemed = action.payload.redeemed;
    },
  },
});

export const launchReducer = launchSlice.reducer;
// export const { setStake, setUnstake, setHarvest, setCompound, changeAmount } =
//   stakeSlice.actions;
