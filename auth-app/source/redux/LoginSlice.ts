import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
    loading: boolean;
    error: string | null;
    userData: any | null;
}

const initialState: AuthState = {
    loading: false,
    error: null,
    userData: null,
};

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://192.168.127.245:3000/api/user/login`, userData);
            const token = response.data.token;
            console.log("login token: ", token)
            // Save the token to AsyncStorage
            await AsyncStorage.setItem('@Token', token);

            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue("An unexpected error occurred");
            }
        }
    }
);

const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.userData = action.payload; // Store the response data here
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.userData = null; // Reset the user data on error
            });
    },
});

export default LoginSlice.reducer;
