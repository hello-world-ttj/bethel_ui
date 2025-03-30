import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";

export const createPlan = async (data: any): Promise<any | null> => {
  try {
    const response = await axiosInstance.post(`/plans`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const getPlan = async (params: {
  search?: string;
  limit?: number;
  page?: number;
}): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/plans`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch members:", error);
    return null;
  }
};
export const getPlanById = async (id: string): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/plans/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch plan:", error);
    return null;
  }
};
export const updatePlan = async (
  id: string,
  data: any
): Promise<any | null> => {
  try {
    const response = await axiosInstance.put(`/plans/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const deletePlan = async (id: string): Promise<any | null> => {
  try {
    const response = await axiosInstance.delete(`/plans/${id}`);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
