import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User not authenticated");
        return;
      }

      try {
        const res = await axios.get("http://localhost:3000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
      } catch (err) {
        setError("Access denied or token expired");
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default Profile;