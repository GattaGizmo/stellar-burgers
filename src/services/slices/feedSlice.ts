import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface FeedState {
  orders: TOrder[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  total: number | null;
  totalToday: number | null;
}

const initialState: FeedState = {
  orders: [],
  status: 'idle',
  error: null,
  total: null,
  totalToday: null
};

export const fetchFeed = createAsyncThunk(
  'feed/fetchFeed',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFeedsApi();
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.message ?? 'Ошибка загрузки данных');
    }
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        Object.assign(state, { status: 'loading' });
      })
      .addCase(
        fetchFeed.fulfilled,
        (
          state,
          action: PayloadAction<{
            orders: TOrder[];
            total: number;
            totalToday: number;
          }>
        ) => {
          Object.assign(state, {
            status: 'succeeded',
            orders: action.payload.orders,
            total: action.payload.total,
            totalToday: action.payload.totalToday
          });
        }
      )
      .addCase(fetchFeed.rejected, (state, action) => {
        Object.assign(state, {
          status: 'failed',
          error: action.payload as string
        });
      });
  }
});

export default feedSlice.reducer;
