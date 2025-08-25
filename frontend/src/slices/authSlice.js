
import { createSlice } from '@reduxjs/toolkit';


const initialState = { 
  userInfo: localStorage.getItem('userInfo') ? 
    JSON.parse(localStorage.getItem('userInfo')) : 
      null,
}

const authSlice = createSlice({ 
  name: 'auth',
  initialState,
  reducers: { 
    setCredentials (authState, action) { 
      authState.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    signOut: (authState, action) => { 
      authState.userInfo = null;
      localStorage.removeItem('userInfo');
    }
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;