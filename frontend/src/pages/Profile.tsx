import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '..styles/'; // We'll define some styling here

interface UserProfile {
  user_id: number;
  fullname: string;
  bio: string;
  profile_picture?: string;
  // Add other fields as needed
}

const UserProfilePage: React.FC = () => {
  const { userId } = useParams();       // e.g. route: /user-profile/:userId
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return; // No userId in params? Just return or show error

      try {
        const token = localStorage.getItem("token");
        // Fetch from your server's user profile endpoint
        const response = await axios.get(
          `http://localhost:3000/api/users/profile/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProfile(response.data);  // store in state
      } catch (err) {
        console.error("❌ Error fetching user profile:", err);
        setError("Could not fetch user profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  if (error) {
    return <div className="profile-error">{error}</div>;
  }

  if (!profile) {
    return <div className="profile-no-data">No profile data available.</div>;
  }

  // Render the user's data in a nice card
  return (
    <div className="profile-page">
      <div className="profile-card">
        <img
          src={profile.profile_picture || "/default-profile.png"}
          alt="Profile"
          className="profile-image"
        />
        <h2 className="profile-name">{profile.fullname}</h2>
        <p className="profile-bio">{profile.bio || "No bio provided."}</p>

        {/* Example: A button to 'Unlike' if you want to show that action */}
        <button className="profile-action-btn">Unlike</button>
      </div>
    </div>
  );
};

export default UserProfilePage;
