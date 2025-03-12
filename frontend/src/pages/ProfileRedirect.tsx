import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Global.css';


const ProfileRedirect = () => {
  const navigate = useNavigate();
  const { userType } = useParams(); // Get the userType from the URL

  useEffect(() => {
    if (userType === 'artist') {
      navigate(`/artist-profile/${userType}`);  // Redirect to artist profile
    } else if (userType === 'employer') {
      navigate(`/employer-profile/${userType}`);  // Redirect to employer profile
    }
  }, [navigate, userType]);

  return <div>Redirecting...</div>;
};

export default ProfileRedirect;
