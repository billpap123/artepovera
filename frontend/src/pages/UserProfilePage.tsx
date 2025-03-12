import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/UserProfilePage.css';

// Portfolio and job posting interfaces
interface PortfolioItem {
  portfolio_id: number;
  image_url?: string;
  description?: string;
}

interface JobPosting {
  job_id: number;
  title: string;
  description?: string;
}

// Artist/Employer profile interfaces
interface ArtistProfile {
  artist_id: number;
  bio?: string;
  profile_picture?: string;
}

interface EmployerProfile {
  employer_id: number;
  bio?: string;
  profile_picture?: string;
}

// The main user profile
interface UserProfile {
  user_id: number;
  fullname: string;
  user_type: string;
  artistProfile?: ArtistProfile | null;
  employerProfile?: EmployerProfile | null;
}

const UserProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  // The user profile object from the server
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // A local boolean to track if we've already liked the user
  // Once it's true, we never revert it back to false
  const [liked, setLiked] = useState<boolean>(false);

  // For an Artist, store portfolio items
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  // For an Employer, store job postings
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);

  // UI states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // If your server returns partial image paths, define a base URL
  const baseURL = "http://localhost:50001";

  // 1) Fetch the current "liked" status from the server
  const fetchLikeStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get(
        `http://localhost:50001/api/users/${userId}/like`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // If server says { liked: true }, we lock the button
      setLiked(response.data.liked);
    } catch (err) {
      console.error('Error fetching like status:', err);
    }
  };

  // 2) Like the user (one-time). No toggling to Unlike
  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("You must be logged in to like someone.");
        return;
      }

      // If already liked, do nothing
      if (liked) return;

      const response = await axios.post(
        `http://localhost:50001/api/users/${userId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data.message);

      // Once liked, lock it
      setLiked(true);

      // If your server has mutual-like logic, you could check that here
      // e.g. response.data.mutualLike ? ...
    } catch (err) {
      console.error('Error liking user:', err);
      alert('Failed to like. Check console for details.');
    }
  };

  // 3) Fetch the user profile
  useEffect(() => {
    if (!userId) {
      console.error("❌ userId is undefined, cannot fetch profile.");
      setError("Invalid user ID.");
      setLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("No token found; user might not be logged in.");
          setLoading(false);
          return;
        }

        // 3a) Get the user profile
        const response = await axios.get(
          `http://localhost:50001/api/users/profile/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("🔍 API Response:", response.data);
        setUserProfile(response.data);

        // 3b) Also fetch the like status
        fetchLikeStatus();
      } catch (err) {
        setError('Error fetching user profile.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  // 4) Once userProfile is loaded, fetch portfolio or job postings
  useEffect(() => {
    if (!userProfile) return;
    const token = localStorage.getItem('token');
    if (!token) return;

    // If user is an Artist, fetch portfolio
    if (userProfile.user_type === 'Artist' && userProfile.artistProfile?.artist_id) {
      const fetchArtistPortfolio = async () => {
        try {
          const res = await axios.get(
            `http://localhost:50001/api/portfolios/${userProfile.artistProfile?.artist_id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setPortfolio(res.data);
        } catch (err) {
          console.error('Error fetching portfolio:', err);
        }
      };
      fetchArtistPortfolio();

    // If user is an Employer, fetch job postings
    } else if (userProfile.user_type === 'Employer' && userProfile.employerProfile?.employer_id) {
      const fetchEmployerJobPostings = async () => {
        try {
          const res = await axios.get(
            `http://localhost:50001/api/job-postings/employer?employer_id=${userProfile.employerProfile?.employer_id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setJobPostings(res.data);
        } catch (err) {
          console.error('Error fetching job postings:', err);
        }
      };
      fetchEmployerJobPostings();
    }
  }, [userProfile]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!userProfile) {
    return (
      <>
        <Navbar />
        <p>No user profile data found.</p>
      </>
    );
  }

  // Is this user an Artist or Employer?
  const isArtistProfile = userProfile.user_type === 'Artist';

  // Grab the correct bio / picture
  const bio = isArtistProfile
    ? userProfile.artistProfile?.bio
    : userProfile.employerProfile?.bio;

  const profilePic = isArtistProfile
    ? userProfile.artistProfile?.profile_picture
    : userProfile.employerProfile?.profile_picture;

  // Helper to build full URL if server returns partial path
  const getImageUrl = (path?: string) => {
    if (!path) return '/default-profile.png';
    if (path.startsWith('http')) return path;
    return `${baseURL}/${path.replace(/^uploads\/uploads\//, 'uploads/')}`;
  };

  return (
    <>
      <Navbar />

      <div className="user-profile-page">
        <div className="profile-decor"></div>
        <div className="profile-card">
          <img
            className="user-profile-img"
            src={getImageUrl(profilePic)}
            alt="Profile"
            onError={(e) => {
              e.currentTarget.src = '/default-profile.png';
            }}
          />
          <h3 className="user-fullname">{userProfile.fullname}</h3>
          <p className="user-bio">{bio || 'No bio available.'}</p>

          {/* 5) A locked "Like" button: once liked, never reverts */}
          <button
            onClick={handleLike}
            disabled={liked}
            className={`like-button ${liked ? 'liked' : ''}`}
          >
            {liked ? 'Liked' : 'Like'}
          </button>

          {/* If Artist => Portfolio */}
          {isArtistProfile ? (
            <div className="portfolio-section">
              <h4>Portfolio</h4>
              {portfolio.length === 0 ? (
                <p>No portfolio items.</p>
              ) : (
                <div className="portfolio-items">
                  {portfolio.map((item) => (
                    <div key={item.portfolio_id} className="portfolio-item">
                      {item.image_url && (
                        <img
                          className="portfolio-image"
                          src={getImageUrl(item.image_url)}
                          alt="Portfolio"
                          onError={(e) => {
                            e.currentTarget.src = '/default-portfolio.png';
                          }}
                        />
                      )}
                      <p>{item.description || 'No description'}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // If Employer => Show job postings
            <div className="job-postings-section">
              <h4>Job feed</h4>
              {jobPostings.length === 0 ? (
                <p>No job postings.</p>
              ) : (
                <div className="job-postings-list">
                  {jobPostings.map((job) => (
                    <div key={job.job_id} className="job-posting-item">
                      <h5>{job.title}</h5>
                      <p>{job.description || 'No description'}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
