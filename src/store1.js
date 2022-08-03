import { configureStore } from '@reduxjs/toolkit'
import tutorialReducer from './slices/tutorials';

const reducer = {
  tutorials: tutorialReducer
}

const store1 = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store1;