import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:50001";

export const fetchUserProfile = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

export const updateProfile = async (userId: number, userType: string, bio: string, profilePicture?: File) => {
  const formData = new FormData();
  formData.append('bio', bio);
  if (profilePicture) formData.append('profile_picture', profilePicture);

  const endpoint = userType === 'Artist' ? 'artists' : 'employers';
  const response = await axios.post(`${API_BASE_URL}/api/${endpoint}/profile/${userId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  return response.data;
};
