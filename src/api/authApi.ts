import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";

export const login = async (data: any): Promise<any | null> => {
    try {
      const response = await axiosInstance.post(`/auth/login`, data);
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  };
  export const getAdmin = async (): Promise<any | null> => {
    try {
      const response = await axiosInstance.get(`/auth/profile`);
      return response.data;
    } catch (error) {
      return null;
    }
  };