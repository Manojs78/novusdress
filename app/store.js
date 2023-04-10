import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Features/auth/authSlice'
import { authApi } from '../app/services/auth/authService'
import { createWrapper } from "next-redux-wrapper";

const makeStore = () => configureStore({
    reducer: {
      auth: authReducer,
      [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware),
  })

  

export const wrapper = createWrapper(makeStore);