import { UserData } from "@/interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import userAction from "../actions/userAction";

export interface UserState {
  currentUser: UserData | null;
  allUser: UserData[] | null;
  userDetail: UserData | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  allUser: [],
  currentUser: null,
  userDetail: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userAction.getAllUsersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        userAction.getAllUsersAsync.fulfilled,
        (state, action: PayloadAction<UserData[]>) => {
          state.loading = false;
          state.allUser = action.payload;
          state.error = null;
        }
      )
      .addCase(userAction.getAllUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      })
      .addCase(userAction.getCurrentUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        userAction.getCurrentUserAsync.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.loading = false;
          state.currentUser = action.payload;
          state.error = null;
        }
      )
      .addCase(userAction.getCurrentUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      })
      .addCase(userAction.getUserDetailsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        userAction.getUserDetailsAsync.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.loading = false;
          state.userDetail = action.payload;
          state.error = null;
        }
      )
      .addCase(userAction.getUserDetailsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      })
      .addCase(userAction.updateUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // .addCase(
      //   userAction.updateUserAsync.fulfilled,
      //   (state, action: PayloadAction<UserData>) => {
      //     state.loading = false;
      //     state.currentUser = action.payload;
      //     state.error = null;
      //   }
      // )
      .addCase(userAction.updateUserAsync.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(userAction.updateUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const selectCurrentUserInfo = (state: RootState) =>
  state.user.currentUser;
export const selectUserDetail = (state: RootState) => state.user.userDetail;
export const selectAllUsers = (state: RootState) => state.user.allUser;

export default userSlice.reducer;
