// store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'
import profileReducer from './Profile';
import LoginSlice from './LoginSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        login: LoginSlice,
        profile: profileReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
