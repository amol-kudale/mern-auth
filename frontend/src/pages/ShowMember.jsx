import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import '../assets/memberManagement.css';

const ShowMember = () => {
  const { currentUser } = useSelector((state) => state.user);
  const currentUserId = currentUser._id;

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMembers();
  }, []);

  const getMembers = async () => {
    try {
      const response = await fetch(`/api/teamuser/members/${currentUserId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setMembers(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const searchHandle = async (e) => {
    const key = e.target.value;
    if (key) {
      try {
        console.log("fetching searched")
        const response = await fetch(`/api/teamuser/members/search?userId=${currentUserId}&key=${key}`);
        console.log(response)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setMembers(result);
      } catch (error) {
        setError(error.message);
      }
    } else {
      getMembers();
    }
  };

  return (
    <>
      <div className="member-list-header border-solid border-4 border-blue-50 p-8">
        Members List
        <input
          className="member-list-member-search"
          type="text"
          placeholder="Search Member"
          onChange={searchHandle}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="member-list-table-body">
          <thead>
            <tr className="member-list-table-head h-10">
              <th>S. No</th>
              <th>Member Name</th>
              <th>Role</th>
              <th>Contact</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {members.length > 0 ? (
              members.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.role}</td>
                  <td>{item.contact}</td>
                  <td>{item.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No Results Found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ShowMember;
