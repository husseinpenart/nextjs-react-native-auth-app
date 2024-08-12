"use client";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie"; // Client-side cookie handling

const Page = () => {
  const [userDetails, setUserDetails] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Toggle user details visibility
  const openUser = () => {
    setUserDetails(!userDetails);
  };

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const cookies = new Cookies();
        const token = cookies.get("@Token"); // Replace '@Token' with your actual cookie name

        const response = await fetch("/api/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("An error occurred while fetching the user profile.");
        }

        const userData = await response.json();
        setData(userData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return (
      <div>
        <h1 className="text-center text-5xl h-screen">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className="text-white">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      {/* <button onClick={openUser} className="bg-blue-500 text-white p-2 rounded">
        {userDetails ? "Hide Details" : "Show Details"}
      </button> */}

      <div className="mt-4">
        <h2 className="text-xl">Profile Details</h2>
        <p>
          <strong>Name:</strong> {data.name}
        </p>
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>Username:</strong> {data.username}
        </p>
        {/* Add other profile fields as necessary */}
      </div>
    </div>
  );
};

export default Page;
