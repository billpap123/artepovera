import React, { useState } from 'react';
import axios from 'axios';

const LikeButton = ({ userId, likedUserId }: { userId: number; likedUserId: number }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    try {
      // Send like request
      await axios.post(`/api/users/${userId}/like`, { likedUserId });

      // Check for mutual like
      const response = await axios.get(`/api/users/${userId}/like`);
      const { isMutualLike } = response.data;

      if (isMutualLike) {
        alert('It’s a match! A chat has been created!');
        createChat();
      } else {
        alert('You liked this user!');
      }

      setIsLiked(true);
    } catch (error) {
      console.error('Error liking user:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const createChat = async () => {
    try {
      await axios.post('/api/chats', {
        artist_id: userId,
        employer_id: likedUserId,
      });
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  return (
    <button onClick={handleLike} disabled={isLiked}>
      {isLiked ? 'Liked' : 'Like'}
    </button>
  );
};

export default LikeButton;
