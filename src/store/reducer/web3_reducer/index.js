import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { initInfo } from "../staking_reducer";
import memepad from "./memepad.json";

export const initWeb3 = createAsyncThunk(
  "InitWeb3",
  async (action, thunkAPI) => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
        },
      },
    };
    const bscTestnet = {
      chainId: "0x61",
      chainName: "BSCTESTNET",
      rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
      nativeCurrency: {
        name: "BINANCE COIN",
        symbol: "BNB",
        decimals: 18,
      },
      blockExplorerUrls: ["https://testnet.bscscan.com/"],
    };
    const bscMainnet = {
      chainId: "0x38",
      chainName: "BSCMAINET",
      rpcUrls: ["https://bsc-dataseed1.binance.org"],
      nativeCurrency: {
        name: "BINANCE COIN",
        symbol: "BNB",
        decimals: 18,
      },
      blockExplorerUrls: ["https://bscscan.com/"],
    };
    const networkData = bscTestnet;
    const web3Modal = new Web3Modal({
      cacheProvider: false, // optional
      providerOptions, // required
      disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
      theme: "dark",
    });
    try {
      const provider = await web3Modal.connect();
      if (provider.isMetaMask) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: networkData.chainId }],
          });
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask.
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: networkData,
              });
            } catch (addError) {
              console.log(addError);
            }
          }
        }
      }
      const web3 = new Web3(provider);
      thunkAPI.dispatch(initContract(web3));

      provider.on("accountsChanged", (accounts) => {
        thunkAPI.dispatch(fetchAccount());
      });

      // Subscribe to chainId change
      provider.on("chainChanged", (chainId) => {
        thunkAPI.dispatch(initContract());
      });
      return {
        web3,
      };
    } catch (error) {
      console.log("Error initializing web3", error);
      throw error;
    }
  }
);

export const fetchAccount = createAsyncThunk(
  "FetchAccount",
  async (action, thunkAPI) => {
    try {
      let web3;
      if (action) web3 = action;
      else web3 = thunkAPI.getState().web3.web3;
      const address = (await web3.eth.getAccounts())[0];
      if (!address) throw "Account disconnected";
      thunkAPI.dispatch(initInfo(address));
      return {
        address,
      };
    } catch (error) {
      console.log("Error fetching account address", error);
      throw error;
    }
  }
);

export const initContract = createAsyncThunk(
  "InitContract",
  async (action, thunkAPI) => {
    try {
      let web3;
      if (action) web3 = action;
      else web3 = thunkAPI.getState().web3.web3;
      const binanceChainId = memepad.network;
      const chainId = await web3.eth.getChainId();
      if (chainId !== binanceChainId)
        // eslint-disable-next-line
        throw "Please Connect to Binance Smart Chain";
      const stakingContract = new web3.eth.Contract(
        memepad.stakingAbi,
        memepad.stakingAddress
      );
      const tokenContract = new web3.eth.Contract(
        memepad.tokenAbi,
        memepad.tokenAddress
      );
      // console.log(airdropContract);
      thunkAPI.dispatch(fetchAccount(web3));
      return {
        stakingContract,
        tokenContract,
      };
    } catch (error) {
      console.log("Error initializing contract: ", error);
      throw error;
    }
  }
);

export const approveTokens = createAsyncThunk(
  "ApproveTokens",
  async (action, thunkAPI) => {
    try {
      const { web3, tokenContract, address } = thunkAPI.getState().web3;
      // let web = new Web3();
      // web.utils.
      const maxUint = web3.utils
        .toBN(2)
        .pow(web3.utils.toBN(256))
        .sub(web3.utils.toBN(1));
      const allowance = await tokenContract.methods
        .allowance(address, memepad.stakingAddress)
        .call();
      if (allowance > Number(maxUint) / 10) return;
      await tokenContract.methods
        .approve(memepad.stakingAddress, maxUint)
        .send({ from: address });
    } catch (error) {
      console.log("Error in loading info:", error);
      throw error;
    }
  }
);

const web3Slice = createSlice({
  name: "Web3Reducer",
  initialState: {
    web3: null,
    stakingContract: null,
    tokenContract: null,
    address: null,
    shortAddress: null,
    connected: false,
    accountUrl: "#",
    stakingUrl: "#",
    tokenUrl: "#",
  },
  reducers: {
    disconnectWallet: (state) => {
      state.connected = false;
      state.enabled = false;
    },
  },
  extraReducers: {
    [initWeb3.fulfilled]: (state, action) => {
      state.web3 = action.payload.web3;
    },
    [initContract.fulfilled]: (state, action) => {
      state.stakingContract = action.payload.stakingContract;
      state.tokenContract = action.payload.tokenContract;
      state.enabled = false;
    },
    [fetchAccount.fulfilled]: (state, action) => {
      state.address = action.payload.address;
      state.shortAddress =
        action.payload.address.slice(0, 6) +
        "..." +
        action.payload.address.slice(38, 42);
      state.accountUrl =
        "https://testnet.bscscan.com/address/" + action.payload.address;
      state.stakingUrl =
        "https://testnet.bscscan.com/address/" +
        memepad.stakingAddress +
        "#code";
      state.tokenUrl =
        "https://testnet.bscscan.com/address/" + memepad.tokenAddress + "#code";
      state.connected = true;
      state.enabled = false;
    },
    [initContract.rejected]: (state) => {
      state.connected = false;
      state.enabled = false;
    },
    [fetchAccount.rejected]: (state) => {
      state.connected = false;
      state.enabled = false;
    },
    [approveTokens.fulfilled]: (state, action) => {
      state.enabled = true;
    },
    [approveTokens.rejected]: (state, action) => {
      state.enabled = false;
    },
  },
});

export const web3Reducer = web3Slice.reducer;
export const { disconnectWallet } = web3Slice.actions;
