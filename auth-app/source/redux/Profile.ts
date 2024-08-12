// redux/profileSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FetchUserProfileResponse, ProfileState } from '..';

// Define the async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk<
    FetchUserProfileResponse,
    void,
    { rejectValue: string }
>(
    'profile/fetchUserProfile',
    async (_, { rejectWithValue }) => {
        try {
            const token = await AsyncStorage.getItem('@Token');
            if (!token) throw new Error('No token found');
            console.log("token: ", token)
            const response = await axios.get('http://192.168.127.245:3000/api/user/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    withCredentials: true,
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
const initialState: ProfileState = {
    profileData: null,
    loading: false,
    error: null,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<FetchUserProfileResponse>) => {
                state.loading = false;
                state.profileData = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred';
            });
    },
});

export default profileSlice.reducer;
