import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";

export const createUser = async (data: any): Promise<any | null> => {
  try {
    const response = await axiosInstance.post(`/users`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const getMember = async (params: {
  search?: string;
  status?: string;
  limit?: number;
  page?: number;
  user?: string;
}): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/users`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch members:", error);
    return null;
  }
};
export const getMemberChurch = async (
  id: string,
  params: {
    search?: string;
    limit?: number;
    page?: number;
    church?: string;
  }
): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/users/church/${id}`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch members:", error);
    return null;
  }
};

export const getUserById = async (id: string): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
};
export const updateUser = async (
  id: string,
  data: any
): Promise<any | null> => {
  try {
    const response = await axiosInstance.put(`/users/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const deleteUser = async (id: string): Promise<any | null> => {
  try {
    const response = await axiosInstance.delete(`/users/${id}`);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const clearCache = async (): Promise<any | null> => {
  try {
    const response = await axiosInstance.post(`/users/clear-cache`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
