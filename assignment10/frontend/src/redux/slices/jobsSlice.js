import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    fetchJobsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchJobsSuccess: (state, action) => {
      state.loading = false;
      state.jobs = action.payload;
      state.error = null;
    },
    fetchJobsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createJobStart: (state) => {
      state.createLoading = true;
      state.createError = null;
    },
    createJobSuccess: (state, action) => {
      state.createLoading = false;
      state.jobs = [action.payload, ...state.jobs];
      state.createError = null;
    },
    createJobFailure: (state, action) => {
      state.createLoading = false;
      state.createError = action.payload;
    },
    clearCreateError: (state) => {
      state.createError = null;
    },
  },
});

export const {
  fetchJobsStart,
  fetchJobsSuccess,
  fetchJobsFailure,
  createJobStart,
  createJobSuccess,
  createJobFailure,
  clearCreateError,
} = jobsSlice.actions;
export default jobsSlice.reducer;
