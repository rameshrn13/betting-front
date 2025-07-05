import httpService from "@/config/httpService";
import { LoginData, RegisterData } from "@/interface/index";

class AuthService {
  login = async (data: LoginData): Promise<any> => {
    try {
      const response = await httpService.post("api/user/login", {
        ...data,
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  register = async (data: RegisterData): Promise<any> => {
    try {
      const response = await httpService.post("/api/user/register", {
        ...data,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  sendOtp = async (data: { email: string }): Promise<any> => {
    try {
      const response = await httpService.post("/api/user/sendOtp", {
        ...data,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  verifyOtp = async (data: { email: string; otp: string }): Promise<any> => {
    try {
      const response = await httpService.post("/api/user/verifyOtp", {
        ...data,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

export default new AuthService();
