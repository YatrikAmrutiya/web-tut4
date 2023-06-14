import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UserDetails() {
  const { _id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-t4.onrender.com/api/users/${_id}`
        );
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div>
        <img
          src={user.picture}
          alt="User Avatar"
          style={{ borderRadius: "2%", height: "132px" }}
        />
        <p>Name: {user.name}</p>
        <p>Age: {user.age}</p>
        <p>Gender: {user.gender}</p>
        <p>Balance: {user.balance}</p>
        <p>Eye Color: {user.eyeColor}</p>
        <p>Company: {user.company}</p>
        <p>Tags: {user.tags.join(", ")}</p>
      </div>
    </div>
  );
}

export default UserDetails;
