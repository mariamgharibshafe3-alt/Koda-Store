import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  sendRegisterOtp,
  verifyRegisterOtp,
  loginUser,
  logoutUser,
  sendForgotPasswordOtp,
  verifyResetPassword,
  getCurrentUser,
  adminTest,
  changeUserRole,
} from '../api/endpoints';


const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('userToken', token);
  } else {
    localStorage.removeItem('userToken');
  }
};

const getAuthToken = () => localStorage.getItem('userToken');



export const useSendRegisterOtp = () => {
  return useMutation({
    mutationFn: sendRegisterOtp,
    onSuccess: () => {
      toast.success('OTP sent to your email successfully!');
    },
    onError: (error) => {
      const message = error?.response?.data?.message || 'Failed to send OTP. Please try again.';
      toast.error(message);
    },
  });
};

export const useVerifyRegisterOtp = () => {
  return useMutation({
    mutationFn: verifyRegisterOtp,
    onSuccess: () => {
      toast.success('Account created successfully! You can now log in.');
    },
    onError: (error) => {
      const message = error?.response?.data?.message || 'OTP verification failed. Please check your code.';
      toast.error(message);
    },
  });
};


export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      const token = response?.token || response?.accessToken;
      if (token) {
        setAuthToken(token);
      }
      toast.success('👋 Welcome back! Logged in successfully.');
    },
    onError: (error) => {
      const message = error?.response?.data?.message || 'Login failed. Please check your email and password.';
      toast.error(message);
    },
  });
};




export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      setAuthToken(null);
      queryClient.removeQueries({ queryKey: ['currentUser'] });
      queryClient.removeQueries({ queryKey: ['adminTest'] });
      toast.success('Logged out successfully.');
    },
    onError: (error) => {
      setAuthToken(null);
      queryClient.removeQueries({ queryKey: ['currentUser'] });
      const message = error?.response?.data?.message || 'An error occurred during logout.';
      toast.error(message);
    },
  });
};






export const useSendForgotPasswordOtp = () => {
  return useMutation({
    mutationFn: sendForgotPasswordOtp,
    onSuccess: () => {
      toast.success('Password reset OTP sent to your email.');
    },
    onError: (error) => {
      const message = error?.response?.data?.message || 'Failed to send reset OTP.';
      toast.error(message);
    },
  });
};





export const useVerifyResetPassword = () => {
  return useMutation({
    mutationFn: verifyResetPassword,
    onSuccess: () => {
      toast.success('Password reset successfully! Log in with your new password.');
    },
    onError: (error) => {
      const message = error?.response?.data?.message || 'Password reset failed. Please check your OTP.';
      toast.error(message);
    },
  });
};








export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await getCurrentUser();
      return response;
    },
  });
};






export const useAdminTest = () => {
  const token = getAuthToken();
  return useQuery({
    queryKey: ['adminTest'],
    queryFn: async () => {
      const response = await adminTest();
      return response;
    },
    enabled: !!token,
    retry: false,
  });
};




export const useChangeRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeUserRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      toast.success('User role updated successfully.');
    },
    onError: (error) => {
      const message = error?.response?.data?.message || 'Failed to update user role. Check your permissions.';
      toast.error(message);
    },
  });
};