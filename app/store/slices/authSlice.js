


  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

  // Async thunk for login
  export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const response = await fetch("http://localhost:3000/api/accounts/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Name: email,   // ✅ if API expects "Name"
            password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          return rejectWithValue(data.message || "Login failed");
        }

        return data; // ✅ just return API response
      } catch (error) {
        return rejectWithValue(error.message || "Something went wrong");
      }
    }
  );


  const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  };

  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      logout: (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || "Login failed";
        });
    },
  });

  export const { logout } = authSlice.actions;
  export default authSlice.reducer;
