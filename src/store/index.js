import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { web3Reducer } from './reducer/web3_reducer';
import { stakingReducer } from './reducer/staking_reducer';

// const store = createStore(reducer, applyMiddleware(thunk))
const store = configureStore({
  reducer: {
    web3: web3Reducer,
    staking: stakingReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
});

export default store;
