import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ShowProject = () => {
  const { currentUser } = useSelector((state) => state.user);
  const currentUserId = currentUser ? currentUser._id : null;

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUserId) {
      fetchProjects();
    }
  }, []);

  const fetchProjects = async () => {
    try {
      console.log("Started project fetching");
      const response = await fetch(`/api/project/show-project/${currentUserId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setProjects(result);
      console.log("Projects fetched");
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  console.warn('projects', projects);
 
  return (
    <>
      <div className=' text-center text-xl h-12 flex items-center justify-center'>ShowProject</div>
      {loading ? (
        <p>Loading projects...</p>
      ) : error ? (
        <p>Error fetching projects: {error.message}</p>
      ) : (
        <table className=' w-full'>
          <thead className=' bg-blue-500 h-10 text-white'>
            <tr>
              <th>Sr. No</th>
              <th>Project Name</th>
              <th>Type</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              
            </tr>
          </thead>
          <tbody className='text-center' >
            {projects.length > 0 ? (
              projects.map((item, index) => (
                <tr className='h-7    ' key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.address}</td>
                  <td>{item.city}</td>
                  <td>{item.state}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No Result found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ShowProject;
