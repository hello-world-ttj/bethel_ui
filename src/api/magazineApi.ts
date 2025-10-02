import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";
export const createMagazine = async (data: any): Promise<any | null> => {
  try {
    const response = await axiosInstance.post(`/backup/magazine`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const getMagazine = async (params: {
  search?: string;
  limit?: number;
  page?: number;
}): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/backup/magazine`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch magazines:", error);
    return null;
  }
};
export const deleteMagazine = async (id: string): Promise<any | null> => {
  try {
    const response = await axiosInstance.delete(`/backup/magazine/${id}`);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
