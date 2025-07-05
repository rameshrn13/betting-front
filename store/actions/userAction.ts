import { UserData } from "@/interface";
import UserService from "@/services/User.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

class UserAction {
  getAllUsersAsync = createAsyncThunk<UserData[], void>(
    "user/allUsers",
    async () => {
      try {
        const response = await UserService.getAllUsers();
        return response?.data.result;
      } catch (error) {
        console.log("error occurred", error);
      }
    }
  );
  getUserDetailsAsync = createAsyncThunk<UserData, string>(
    "user/userDetail",
    async (id) => {
      try {
        const response = await UserService.getUserDetail(id);
        return response?.data.result;
      } catch (error) {
        console.log("error occurred", error);
      }
    }
  );
  getCurrentUserAsync = createAsyncThunk<UserData>(
    "user/currentUser",
    async () => {
      const response = await UserService.getCurrentUser();
      return response?.data.result;
    }
  );
  updateUserAsync = createAsyncThunk<
    void,
    { id: string | undefined; updateData: UserData }
  >("user/updateUser", async ({ id, updateData }) => {
    const response = await UserService.updateUser(id, updateData);
    return response?.data.result;
  });
}

export default new UserAction();
