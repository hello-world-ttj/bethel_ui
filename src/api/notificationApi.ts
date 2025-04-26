import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";

export const createNotification = async (data: any): Promise<any | null> => {
    try {
      const response = await axiosInstance.post(`/notification`, data);
      toast.success(response.data.message);
      return response.data;
    } catch (error : any) {
      throw error.response.data;
    }
  };
  export const getNotification = async (params: {
    search?: string;
    limit?: number;
    page?: number;
  }): Promise<any | null> => {
    try {
      const response = await axiosInstance.get(`/notification`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch members:", error);
      return null;
    }
  };