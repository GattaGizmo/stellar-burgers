import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { setCookie } from '../../utils/cookie';

interface UserState {
  user: TUser | null;
  orders: TOrder[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  orders: [],
  status: 'idle',
  isAuthChecked: false,
  isAuthenticated: false,
  error: null
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: TRegisterData, { rejectWithValue }) => {
    try {
      const { refreshToken, accessToken, user } =
        await registerUserApi(userData);
      localStorage.setItem('refreshToken', refreshToken);
      setCookie('accessToken', accessToken);
      return user;
    } catch (error) {
      return rejectWithValue('Registration failed');
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData, { rejectWithValue }) => {
    try {
      const { refreshToken, accessToken, user } = await loginUserApi(loginData);
      localStorage.setItem('refreshToken', refreshToken);
      setCookie('accessToken', accessToken);
      return user;
    } catch (error) {
      return rejectWithValue('Login failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      localStorage.removeItem('refreshToken');
      setCookie('accessToken', '', { expires: -1 });
    } catch (error) {
      return rejectWithValue('Logout failed');
    }
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await getUserApi();
    } catch (error) {
      return rejectWithValue('Failed to fetch user');
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  'user/update',
  async (userData: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      return await updateUserApi(userData);
    } catch (error) {
      return rejectWithValue('Failed to update user');
    }
  }
);

export const getOrders = createAsyncThunk(
  'user/getOrders',
  async (_, { rejectWithValue }) => {
    try {
      return await getOrdersApi();
    } catch (error) {
      return rejectWithValue('Failed to fetch orders');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isAuthChecked = true;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  }
});

export default userSlice.reducer;
