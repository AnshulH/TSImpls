import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../slices/searchSlice';


// Create the Redux store and pass in the postsReducer as the initial data
const store = configureStore({
  reducer: {
    search: searchReducer,
  },
})

export default store;