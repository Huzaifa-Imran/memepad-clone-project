import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import memepad from "./memepad.json";
import Web3 from "web3";
import { stakeIds, stakingState } from "./stakingInitialStates";

export const initializeStaking = createAsyncThunk(
  "InitializeLaunches",
  async (action, thunkAPI) => {
    const { web3 } = thunkAPI.getState().web3;
    const mepadTokenContract = new web3.eth.Contract(
      memepad.mepadTokenAbi,
      memepad.mepadTokenAddress
    );
    const decimals = Number(
      await mepadTokenContract.methods.decimals().call()
    );
    thunkAPI.dispatch(stakingSlice.actions.setMepadToken({mepadTokenContract, decimals}));
    for (let i = 0; i < stakeIds.length; ++i) {
      thunkAPI.dispatch(initStake(stakeIds[i]));
    }
  }
);

export const initStake = createAsyncThunk(
  "InitStake",
  async (action, thunkAPI) => {
    await thunkAPI.dispatch(initStakingContract(action));
    await thunkAPI.dispatch(initStakingInfo(action));
    await thunkAPI.dispatch(loadStakingInfo(action));
  }
);

export const initStakingContract = createAsyncThunk(
  "InitContract",
  async (action, thunkAPI) => {
    try {
      const { web3 } = thunkAPI.getState().web3;
      const binanceChainId = memepad.network;
      const chainId = await web3.eth.getChainId();
      if (chainId !== binanceChainId)
        // eslint-disable-next-line
        throw "Please Connect to Binance Smart Chain";
      const stakingContract = new web3.eth.Contract(
        memepad[action].stakingAbi,
        memepad[action].stakingAddress
      );
      return {
        stakingContract,
        stakeId: action,
      };
    } catch (error) {
      console.log("Error initializing contract: ", error);
      throw error;
    }
  }
);

export const initStakingInfo = createAsyncThunk(
  "InitInfo",
  async (action, thunkAPI) => {
    try {
      const { decimals } = thunkAPI.getState().staking;
      const { stakingContract } = thunkAPI.getState().staking[action];
      const removeDecimals = (val) => {
        return Number(val) / 10 ** decimals;
      };
      const rewardPerBlock = removeDecimals(
        await stakingContract.methods.rewardPerBlock().call()
      );
      return {
        rewardPerBlock,
        stakeId: action,
      };
    } catch (error) {
      console.log("Error initializing info:", error);
      throw error;
    }
  }
);

export const loadStakingInfo = createAsyncThunk(
  "LoadInfo",
  async (action, thunkAPI) => {
    try {
      const { address } = thunkAPI.getState().web3;
      const { mepadTokenContract, decimals } = thunkAPI.getState().staking;
      const { stakingContract } =
        thunkAPI.getState().staking[action];
      const removeDecimals = (val) => {
        return Number(val) / 10 ** decimals;
      };
      const responses = await Promise.all([
        mepadTokenContract.methods.balanceOf(address).call(),
        stakingContract.methods.userInfo(address).call(),
        stakingContract.methods.pendingReward(address).call(),
        stakingContract.methods.totalStakingTokens().call(),
        mepadTokenContract.methods
        .allowance(address, memepad[action].stakingAddress)
        .call(),
      ]);
      return {
        pendingReward: removeDecimals(responses[2]),
        totalStakingTokens: removeDecimals(responses[3]),
        mepadTokens: removeDecimals(responses[0]),
        stakedAmount: removeDecimals(responses[1].amount),
        enabled: Boolean(Number(responses[4]) > Number(responses[0])),
        stakeId: action,
      };
    } catch (error) {
      console.log("Error in loading info:", error);
      throw error;
    }
  }
);

export const withdrawAndCollectReward = createAsyncThunk(
  "WithdrawAndCollectReward",
  async (action, thunkAPI) => {
    try {
      const { address } = thunkAPI.getState().web3;
      const { stakingContract } = thunkAPI.getState().staking[action.id];
      const { decimals } = thunkAPI.getState().staking;
      await stakingContract.methods
        .withdraw(Web3.utils.toBN(action.amount * (10 ** decimals)))
        .send({ from: address });
      thunkAPI.dispatch(loadStakingInfo());
    } catch (error) {
      console.log("Cant Withdraw MEPAD: ", error);
    }
  }
);

export const stakeMepad = createAsyncThunk(
  "StakeMEPAD",
  async (action, thunkAPI) => {
    try {
      const { address } = thunkAPI.getState().web3;
      const { stakingContract } = thunkAPI.getState().staking[action.id];
      const { decimals } = thunkAPI.getState().staking;
      await stakingContract.methods
        .deposit(action.amount * (10 ** decimals))
        .send({ from: address });
      thunkAPI.dispatch(loadStakingInfo());
    } catch (error) {
      console.log("Cant Stake MEPAD: ", error);
    }
  }
);



export const approveMepadTokens = createAsyncThunk(
  "ApproveMEPADTokens",
  async (action, thunkAPI) => {
    try {
      const { address } = thunkAPI.getState().web3;
      const { mepadTokenContract } = thunkAPI.getState().staking;
      const maxUint = Web3.utils
        .toBN(2)
        .pow(Web3.utils.toBN(256))
        .sub(Web3.utils.toBN(1));
      await mepadTokenContract.methods
        .approve(memepad[action].stakingAddress, maxUint)
        .send({ from: address });
        thunkAPI.dispatch(loadStakingInfo(action));
    } catch (error) {
      console.log("Error in loading info:", error);
      throw error;
    }
  }
);

const stakingSlice = createSlice({
  name: "StakingReducer",
  initialState: stakingState,
  reducers: {
    setMepadToken: (state, action) => {
      state.mepadTokenContract = action.payload.mepadTokenContract;
      state.decimals = action.payload.decimals;
    } 
  },
  extraReducers: {
    [initStakingContract.fulfilled]: (state, action) => {
      const stakeId = action.payload.stakeId;
      state[stakeId].stakingContract = action.payload.stakingContract;
    },
    [initStakingInfo.fulfilled]: (state, action) => {
      console.log("initInfo fulfilled");
      const stakeId = action.payload.stakeId;
      state[stakeId].rewardPerYear = action.payload.rewardPerBlock * 10512000;
    },
    [loadStakingInfo.fulfilled]: (state, action) => {
      console.log("loadInfo fulfilled");
      const stakeId = action.payload.stakeId;
      state[stakeId].pendingReward = action.payload.pendingReward;
      state[stakeId].totalStakingTokens = action.payload.totalStakingTokens;
      state.mepadTokens = action.payload.mepadTokens;
      state[stakeId].enabled = action.payload.enabled;
      state[stakeId].stakedAmount = action.payload.stakedAmount;
    },
    [stakeMepad.pending]: (state, action) => {
      state.staking = true;
    },
    [stakeMepad.fulfilled]: (state, action) => {
      state.staking = false;
    },
    [stakeMepad.rejected]: (state, action) => {
      state.staking = false;
    },
    [withdrawAndCollectReward.pending]: (state, action) => {
      state.unstaking = true;
    },
    [withdrawAndCollectReward.fulfilled]: (state, action) => {
      state.unstaking = false;
    },
    [withdrawAndCollectReward.rejected]: (state, action) => {
      state.unstaking = false;
    },
  },
});

export const stakingReducer = stakingSlice.reducer;
// export const { setStake, setUnstake, setHarvest, setCompound, changeAmount } =
//   stakeSlice.actions;
