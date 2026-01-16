
import { createSlice } from '@reduxjs/toolkit';


const initialState = { 
  userInfo: localStorage.getItem('userInfo') ? 
    JSON.parse(localStorage.getItem('userInfo')) : 
      null,
}

const authApiSlice = createSlice({ 
  name: 'signIn',
  initialState,
  reducers: { 
    setCredentials (state, action) { 
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    signOut: (state, action) => { 
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    }
  },
});

export const { setCredentials, signOut } = authApiSlice.actions;

export default authApiSlice.reducer;