import { createSlice } from '@reduxjs/toolkit';

export const repositorySlice = createSlice({
  name: 'repositories',
  initialState: {
    owner: '',
    name: '',
    loading: false,
  },
  reducers: {
    updateRepository: (state, { payload }) => {
      state.owner = payload.owner;
      state.name = payload.name;
      state.loading = true;
    },
    stopLoadingRepository: (state) => {
      state.loading = false;
    },
    clearRepository: (state) => {
      state.owner = '';
      state.name = '';
      state.loading = false;
    },
  },
});

export const {
  updateRepository,
  stopLoadingRepository,
  clearRepository,
} = repositorySlice.actions;

export default repositorySlice.reducer;
