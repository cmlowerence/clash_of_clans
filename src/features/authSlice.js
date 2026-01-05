import { createSlice } from '@reduxjs/toolkit';

// Check if token exists in localStorage on load
const initialToken = localStorage.getItem('coc_api_token') || '';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: initialToken,
    isAuthenticated: !!initialToken,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('coc_api_token', action.payload); // Save to phone storage
    },
    logout: (state) => {
      state.token = '';
      state.isAuthenticated = false;
      localStorage.removeItem('coc_api_token');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
