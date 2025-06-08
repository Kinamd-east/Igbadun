import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // adjust path if needed
import Navbar from '@/components/Navbar';

const Profile = () => {
  const { id } = useParams(); // This is the UID from the URL
  const [userData, setUserData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const docRef = doc(db, "users", id); // looks for a document with ID = uid
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
          setNotFound(false);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="pt-32 px-6">
        {loading ? (
          <p>Loading...</p>
        ) : notFound ? (
          <p>User not found.</p>
        ) : (
          <div>
            <h2 className="text-xl font-bold">{userData?.fullName}</h2>
            <p className="text-gray-600">@{userData?.username}</p>
            <p>Email: {userData?.email}</p>
            {/* Add more fields as needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
