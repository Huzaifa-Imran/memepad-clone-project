import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { initializeLaunches } from "../launch_reducer";
import { initializeStaking } from "../staking_reducer";
import memepad from "../launch_reducer/memepad.json";


export const connectWallet = createAsyncThunk(
  "ConnectWallet",
  async (action, thunkAPI) => {
    await thunkAPI.dispatch(initWeb3());
    await thunkAPI.dispatch(fetchAccount());
    thunkAPI.dispatch(initializeLaunches());
    thunkAPI.dispatch(initializeStaking());
  }
);

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

      provider.on("accountsChanged", (accounts) => {
        thunkAPI.dispatch(fetchAccount());
      });

      // Subscribe to chainId change
      provider.on("chainChanged", (chainId) => {
        thunkAPI.dispatch(initializeStaking());
        thunkAPI.dispatch(initializeLaunches());
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
      const web3 = thunkAPI.getState().web3.web3;
      const address = (await web3.eth.getAccounts())[0];
      if (!address) throw "Account disconnected";
      return {
        address,
      };
    } catch (error) {
      console.log("Error fetching account address", error);
      throw error;
    }
  }
);

const web3Slice = createSlice({
  name: "Web3Reducer",
  initialState: {
    web3: null,
    address: null,
    shortAddress: null,
    connected: false,
    accountUrl: "#",
  },
  reducers: {
    disconnectWallet: (state) => {
      state.connected = false;
    },
  },
  extraReducers: {
    [connectWallet.rejected]: (state) => {
      state.connected = false;
    },
    [initWeb3.fulfilled]: (state, action) => {
      state.web3 = action.payload.web3;
    },
    [fetchAccount.fulfilled]: (state, action) => {
      state.address = action.payload.address;
      state.shortAddress =
        action.payload.address.slice(0, 6) +
        "..." +
        action.payload.address.slice(38, 42);
      state.accountUrl = memepad.prefix + action.payload.address;
      state.connected = true;
    },
    [fetchAccount.rejected]: (state) => {
      state.connected = false;
    },
  },
});

export const web3Reducer = web3Slice.reducer;
export const { disconnectWallet } = web3Slice.actions;
