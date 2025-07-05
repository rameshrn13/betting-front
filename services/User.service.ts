import httpService from "@/config/httpService";
import { UserData } from "@/interface";
// import { UserData } from "@/interface";

class UserService {
  getAllUsers = async () => {
    try {
      const response = await httpService.get("api/user");
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  getCurrentUser = async () => {
    try {
      const response = await httpService.get("api/user/own");
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  getUserDetail = async (id: string) => {
    try {
      const response = await httpService.get(`api/user/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  createUserWithoutPassword = async (userData: UserData) => {
    try {
      const response = await httpService.post(`api/user/createUser`, {
        ...userData,
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  updateUser = async (id: string | undefined, updateData: UserData) => {
    try {
      const response = await httpService.put(`api/user/update/${id}`, {
        ...updateData,
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export default new UserService();
