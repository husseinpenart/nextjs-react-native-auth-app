import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
    loading: boolean;
    error: string | null;
    userData: any | null; // Add this line to store the user data
}

const initialState: AuthState = {
    loading: false,
    error: null,
    userData: null, // Initialize it here
};

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData: { name: string; email: string; username: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://192.168.127.245:3000/api/user/register`, userData);
            console.log("response.data: ", response.data);
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

const authSlice = createSlice({
    name: 'auth',
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

export default authSlice.reducer;
