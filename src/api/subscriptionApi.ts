import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";

export const createSubscription = async (data: any): Promise<any | null> => {
  try {
    const response = await axiosInstance.post(`/subscription`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const getSubscription = async (params: {
  search?: string;
  limit?: number;
  page?: number;
  status?: string;
}): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/subscription`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch members:", error);
    return null;
  }
};
export const getSubscriptionById = async (id: string): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/subscription/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch subscription:", error);
    return null;
  }
};
export const updateSubscription = async (
  id: string,
  data: any
): Promise<any | null> => {
  try {
    const response = await axiosInstance.put(`/subscription/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error : any) {
    throw error.response.data;
  }
};
export const deleteSubscription = async (id: string): Promise<any | null> => {
  try {
    const response = await axiosInstance.delete(`/subscription/${id}`);
    toast.success(response.data.message);
    return response.data;
  } catch (error : any) {
    throw error.response.data;
  }
};
export const getPdf = async (): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/subscription/generate-labels`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    return null;
  }
};
export const getSubscriptionByUserId = async (id: string): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/subscription/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch subscription:", error);
    return null;
  }
};