import { User } from '@prisma/client';
import { axiosInstance } from './instance';
import axios from 'axios';

export const getMe = async () => {
  try {
    const { data } = await axiosInstance.get<User>('/auth/me');
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error details:', error.response?.data);
    }
    throw error; 
  }
};
