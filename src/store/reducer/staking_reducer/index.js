import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import memepad from '../web3_reducer/memepad.json';
import Web3 from "web3";

export const initInfo = createAsyncThunk(
  'InitInfo',
  async (action, thunkAPI) => {
    try {
      const fromWei = (val) => {
        return web3.utils.fromWei(String(val));
      };
      const address = action;
      const { web3, stakingContract, tokenContract } =
        thunkAPI.getState().web3;
      const userInfo = await stakingContract.methods.userInfo(address).call();
      const rewardPerBlock = Number(fromWei(await stakingContract.methods.rewardPerBlock().call()));
      const totalStakingTokens = Number(fromWei(await stakingContract.methods.totalStakingTokens().call()));

      thunkAPI.dispatch(loadInfo());

      return {
        stakedAmount: Number(fromWei(userInfo.amount)),
        rewardPerBlock,
        totalStakingTokens,
      };
    } catch (error) {
      console.log('Error initializing info:', error);
      throw error;
    }
  }
);

export const loadInfo = createAsyncThunk(
  'LoadInfo',
  async (action, thunkAPI) => {
    try {
      const fromWei = (val) => {
        return web3.utils.fromWei(String(val));
      };
      const { web3, tokenContract, stakingContract, address } = thunkAPI.getState().web3;
      const pendingReward = fromWei(await stakingContract.methods.pendingReward(address).call());
      return {
        pendingReward,
      };
    } catch (error) {
      console.log('Error in loading info:', error);
      throw error;
    }
  }
);

export const collectReward = createAsyncThunk(
  'CollectReward',
  async (_action, thunkAPI) => {
    try {
      const { stakingContract, address } = thunkAPI.getState().web3;
      await stakingContract.methods.withdraw(0).send({from: address});
    } catch (error) {
      console.log('Cant Collect Reward: ', error);
    }
  }
);

const stakingSlice = createSlice({
  name: 'StakingReducer',
  initialState: {
    pendingReward: '0',
    stakedAmount: 0,
    rewardPerBlock: 0,
    rewardPerYear: 0,
    totalStakingTokens: 0,
    loading: false,
  },
  reducers: {
    // setHarvest: (state) => {
    //   state.currentSelection = 'harvest';
    //   state.amount = '0';
    // },
    // setStake: (state) => {
    //   state.currentSelection = 'stake';
    //   state.amount = '0';
    // },
    // setUnstake: (state) => {
    //   state.currentSelection = 'unstake';
    //   state.amount = '0';
    // },
    // setCompound: (state) => {
    //   state.currentSelection = 'compound';
    //   state.amount = '0';
    // },
    // changeAmount: (state, action) => {
    //   state.amount = action.payload;
    // },
  },
  extraReducers: {
    [initInfo.fulfilled]: (state, action) => {
      state.stakedAmount = action.payload.stakedAmount;
      state.pendingReward = action.payload.pendingReward;
      state.rewardPerBlock = action.payload.rewardPerBlock;
      state.rewardPerYear = action.payload.rewardPerBlock * 10512000;
      state.totalStakingTokens = action.payload.totalStakingTokens;
      state.loading = false;
    },
    [initInfo.pending]: (state) => {
      state.loading = true;
    },
    [initInfo.rejected]: (state) => {
      console.log('Error initializing info');
      state.loading = false;
    },
    [loadInfo.fulfilled]: (state, action) => {
      state.pendingReward = action.payload.pendingReward;
    },
    // [getMockTokens.fulfilled]: (state) => {
    //   state.loading = false;
    // },
    // [getMockTokens.pending]: (state) => {
    //   state.loading = true;
    // },
    // [getMockTokens.rejected]: (state) => {
    //   state.loading = false;
    //   console.log('Failed to fetch tokens');
    // },
    // [performAction.fulfilled]: (state) => {
    //   state.amount = '0';
    //   state.loading = false;
    // },
    // [performAction.pending]: (state) => {
    //   state.loading = true;
    // },
    // [performAction.rejected]: (state) => {
    //   state.loading = false;
    // },
  },
});

export const stakingReducer = stakingSlice.reducer;
// export const { setStake, setUnstake, setHarvest, setCompound, changeAmount } =
//   stakeSlice.actions;
