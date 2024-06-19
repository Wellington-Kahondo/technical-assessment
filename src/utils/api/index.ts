'use client'
import axios from "axios";

type ApiActionType = 'post' | 'get' | 'put' | 'delete';

export function getAxiosInstance (){
    const baseUrl = 'https://localhost:44311/'; //to move it to .env
    const instance = axios.create({
        baseURL: baseUrl,
        headers: {
          'Content-Type': 'application/json'
        }
    });
    return instance;
}

const getData = async (path: string, instance: any) => {
    return await api(path, 'get', {}, instance);
  };
  
  const postData = async (path: string, data: any, instance: any) => {
    return await api(path, 'post', data, instance);
  };
  
  const deleteData = async (path: string, instance: any) => {
    return await api(path, 'delete', {}, instance);
  };
  
  const updateData = async (path: string, data: any, instance: any) => {
    return await api(path, 'put', data, instance);
  };

const api = async (path: string, action: ApiActionType, data: any = {}, instance: any) => {
    try {
      const response = await instance[action](path, data);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  };
  
  const handleError = (error: any) => {
    console.error(error);
    if (error.response) {
      throw new Error(error.response.data.message || 'Unknown error occurred');
    }
    throw new Error(error.message || 'Unknown error occurred');
  };

export { api, deleteData, getData, postData, updateData };
export type { ApiActionType };