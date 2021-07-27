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
      let address;
      if(action)
        address = action;
      else
        address = thunkAPI.getState().web3.address;
      const { web3, stakingContract, tokenContract } =
        thunkAPI.getState().web3;
      const userInfo = await stakingContract.methods.userInfo(address).call();
      const rewardPerBlock = Number(fromWei(await stakingContract.methods.rewardPerBlock().call()));
      const mepadTokens = fromWei(await tokenContract.methods.balanceOf(address).call());

      thunkAPI.dispatch(loadInfo());

      return {
        stakedAmount: fromWei(userInfo.amount),
        rewardPerBlock,
        mepadTokens,
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
      const totalStakingTokens = Number(fromWei(await stakingContract.methods.totalStakingTokens().call()));
      return {
        pendingReward,
        totalStakingTokens,
      };
    } catch (error) {
      console.log('Error in loading info:', error);
      throw error;
    }
  }
);

export const withdrawAndCollectReward = createAsyncThunk(
  'WithdrawAndCollectReward',
  async (action, thunkAPI) => {
    try {
      const { stakingContract, address, web3 } = thunkAPI.getState().web3;
      await stakingContract.methods.withdraw(web3.utils.toWei(action)).send({from: address});
      thunkAPI.dispatch(initInfo);
    } catch (error) {
      console.log('Cant Withdraw MEPAD: ', error);
    }
  }
);

export const stakeMepad = createAsyncThunk(
  'StakeMEPAD',
  async (action, thunkAPI) => {
    try {
      const { stakingContract, address, web3 } = thunkAPI.getState().web3;
      await stakingContract.methods.deposit(web3.utils.toWei(action)).send({from: address});
      thunkAPI.dispatch(initInfo());
    } catch (error) {
      console.log('Cant Stake MEPAD: ', error);
    }
  }
);

const stakingSlice = createSlice({
  name: 'StakingReducer',
  initialState: {
    pendingReward: '0',
    stakedAmount: '0',
    rewardPerBlock: 0,
    rewardPerYear: 0,
    totalStakingTokens: 0,
    mepadTokens: '0',
    loading: false,
    staking: false,
    unstaking: false,
  },
  extraReducers: {
    [initInfo.fulfilled]: (state, action) => {
      console.log('initInfo fulfilled');
      state.stakedAmount = action.payload.stakedAmount;
      state.rewardPerBlock = action.payload.rewardPerBlock;
      state.rewardPerYear = action.payload.rewardPerBlock * 10512000;
      state.mepadTokens = action.payload.mepadTokens;
      state.loading = false;
    },
    [initInfo.rejected]: (state) => {
      console.log('Error initializing info');
      state.loading = false;
    },
    [loadInfo.fulfilled]: (state, action) => {
      console.log('loadInfo fulfilled');
      state.pendingReward = action.payload.pendingReward;
      state.totalStakingTokens = action.payload.totalStakingTokens;
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
    }
  },
});

export const stakingReducer = stakingSlice.reducer;
// export const { setStake, setUnstake, setHarvest, setCompound, changeAmount } =
//   stakeSlice.actions;
