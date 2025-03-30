import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";
export const createChurch = async (data: any): Promise<any | null> => {
  try {
    const response = await axiosInstance.post(`/church`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const getChurch = async (params: {
  search?: string;
  limit?: number;
  page?: number;
  church?: string;
}): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/church`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch members:", error);
    return null;
  }
};
export const getChurchById = async (id: string): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/church/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch church:", error);
    return null;
  }
};
export const updateChurch = async (
  id: string,
  data: any
): Promise<any | null> => {
  try {
    const response = await axiosInstance.put(`/church/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const deleteChurch = async (id: string): Promise<any | null> => {
  try {
    const response = await axiosInstance.delete(`/church/${id}`);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
