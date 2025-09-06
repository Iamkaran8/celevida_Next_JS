import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchAllUsersAccount = createAsyncThunk(
    "users/fetchAccounts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("/api/accounts/getAccounts");

            // Check if the response is ok
            if (!response.ok) {
                throw new Error("Failed to fetch user accounts");
            }

            const data = await response.json();
            return data; // This becomes the payload for fulfilled
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);



export const createUserAccount = createAsyncThunk(
    "users/createAccount",
    async (newUser, { rejectWithValue }) => {
        try {
            const response = await fetch("/api/accounts/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify([newUser]), // API expects array as per your curl
            });

            if (!response.ok) {
                throw new Error("Failed to create user account");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


// Initial state
const initialState = {
    accounts: [],
    loading: false,
    error: null,
};

// Slice
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsersAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllUsersAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.accounts = action.payload;
            })
            .addCase(fetchAllUsersAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            }).addCase(createUserAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUserAccount.fulfilled, (state, action) => {
                state.loading = false;
                // state.accounts.push(action.payload);
            })
            .addCase(createUserAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });

    },
});

export default usersSlice.reducer;
// export const {} = usersSlice.actions; // Uncomment if you have reducers
