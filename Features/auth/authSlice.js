import { createSlice } from '@reduxjs/toolkit'
import { registerUser,userLogin } from '../../Actions/authActions'
import { HYDRATE } from "next-redux-wrapper";






// initialize userToken from local storage

// const setSession = (accessToken) => {
//   if (typeof window !== 'undefined')
//     localStorage.setItem('accessToken', accessToken);
// };

const getAccessToken = () => {
  if (typeof window !== 'undefined') {
     return sessionStorage.getItem('userToken');
    }
};
const userToken = getAccessToken();

// const userToken = sessionStorage.getItem('userToken')

const new_user_id = ""


const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  new_user_id,
  error: null,
  success: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
        state.userInfo = payload
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
    // login user reducer...
    [userLogin.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
      state.userToken = payload.userToken
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    // register user reducer...
    [registerUser.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true // registration successful
      state.new_user_id = payload.new_user_id
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    
  },
})

export const { setCredentials } = authSlice.actions
export default authSlice.reducer