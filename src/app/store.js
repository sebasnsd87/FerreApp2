import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import shopReducer from "../features/shop/shopSlice"
import { shopApi } from './service/shopService'
import cartReducer from "../features/cart/cartSlice"

export const store = configureStore({
  reducer: {
    shop:shopReducer,
    cart:cartReducer,
    [shopApi.reducerPath]: shopApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(shopApi.middleware),
  
})

setupListeners(store.dispatch)