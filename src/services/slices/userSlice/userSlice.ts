import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  TRegisterData,
  loginUserApi,
  TLoginData,
  getUserApi,
  getOrdersApi,
  logoutApi,
  updateUserApi,
  registerUserApi
} from '@api';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../../utils/cookie';

type TUserState = {
  request: boolean;
  response: TUser | null;
  userData: TUser | null;
  registerData: TRegisterData | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  loginUserRequest: boolean;
  userOrders: TOrder[];
  error: string | null;
};

export const initialState: TUserState = {
  request: false,
  response: null,
  userData: null,
  registerData: null,
  isAuthChecked: false,
  isAuthenticated: false,
  loginUserRequest: false,
  userOrders: [],
  error: null
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (registerData: TRegisterData) => await registerUserApi(registerData)
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    if (!data.success) {
      return data;
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const getUser = createAsyncThunk('user/getUser', getUserApi);

export const getOrdersAll = createAsyncThunk('user/ordersUser', getOrdersApi);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  logoutApi().then(() => {
    localStorage.clear();
    deleteCookie('accessToken');
  });
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: (state) => {
      state.userData = null;
    },
    resetError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loginUserRequest = true;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.userData = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.loginUserRequest = false;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.request = true;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.request = false;
        state.response = action.payload.user;
        state.userData = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.request = false;
        state.isAuthChecked = false;
        state.error = action.error.message as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.userData = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.isAuthChecked = true;
        state.error = action.error.message as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.request = true;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.request = false;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.response = action.payload.user;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.request = true;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.request = false;
        state.userData = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.request = false;
        state.isAuthenticated = true;
        state.isAuthChecked = false;
        state.error = action.error.message as string;
      })
      .addCase(getOrdersAll.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(getOrdersAll.fulfilled, (state, action) => {
        state.request = false;
        state.userOrders = action.payload;
        state.error = null;
      })
      .addCase(getOrdersAll.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message as string;
      });
  },
  selectors: {
    getUserState: (state) => state,
    getError: (state) => state.error
  }
});

export default userSlice.reducer;
export const { userLogout, resetError } = userSlice.actions;
export const { getUserState, getError } = userSlice.selectors;
