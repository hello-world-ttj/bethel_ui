import axiosInstance from "./axiosintercepter";
export const createChurch = async (data: any): Promise<any | null> => {
    try {
      const response = await axiosInstance.post(`/church`, data);
      return response.data;
    } catch (error) {
      console.error("Failed to create church:", error);
      return null;
    }
  };
export const getChurch = async (): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/church`);
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
      return response.data;
    } catch (error) {
      console.error("Failed to update church:", error);
      return null;
    }
  };
export const deleteChurch = async (id: string): Promise<any | null> => {
    try {
      const response = await axiosInstance.delete(`/church/${id}`);
      return response.data;
    } catch (error) {
      console.error("Failed to delete user:", error);
      return null;
    }
  };