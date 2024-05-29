import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams,  useNavigate } from 'react-router-dom';

import '../assets/projectDetails.css'


const ProjectDetails = () => {
  const {currentUser} = useSelector((state)=> state.user);
  const currentUserId = currentUser._id;
  const { projectId } = useParams();
  console.log(projectId)
  
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    fetchProject();
    fetchMembers();
  }, []);

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/project/project-details/${projectId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log("this is project details")
      setProject(result);
      console.warn(result)
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await fetch(`/api/teamuser/members/${currentUserId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setMembers(result);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/project/project-details/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      navigate('/');
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleMemberSelection = (memberId) => {
    setSelectedMembers(prev => {
      if (prev.includes(memberId)) {
        return prev.filter(id => id !== memberId);
      } else {
        return [...prev, memberId];
      }
    });
  };

  const handleAllocateMembers = async () => {
    try {

      // const selectedMemberObjects = members.filter(member => selectedMembers.includes(member._id));

      const response = await fetch(`/api/project/allocate-members/${projectId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ members: selectedMembers }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok for member allocation');
      }
      fetchProject();
    } catch (error) {
      console.error("Error allocating members:", error);
    }
  };

  if (loading) return <p>Loading project details...</p>;
  if (error) return <p>Error fetching project details: {error.message}</p>;


  const filteredMembers = members.filter((member) =>
    project.teamMembers.some((teamMember) => teamMember === member._id)
  );
  console.log(filteredMembers , "filtered members")



  return (
    <div className="project-details">
      <h1>{project.name} </h1>
      <form
       onSubmit={handleUpdate}
       >
        <label htmlFor="">
          Name
          <input
            type="text"
            value={project.name}
            onChange={(e) => setProject({ ...project, name: e.target.value })}
          />
        </label>
        <label htmlFor="">
          Type
          <input
            type="text"
            value={project.type}
            onChange={(e) => setProject({ ...project, type: e.target.value })}
          />
        </label>
        <label htmlFor="">
          Address
          <input
            type="text"
            value={project.address}
            onChange={(e) => setProject({ ...project, address: e.target.value })}
          />
        </label>
        <label htmlFor="">
          City
          <input
            type="text"
            value={project.city}
            onChange={(e) => setProject({ ...project, city: e.target.value })}
          />
        </label>
        <label htmlFor="">
          State
          <input
            type="text"
            value={project.state}
            onChange={(e) => setProject({ ...project, state: e.target.value })}
          />
        </label>
        <label htmlFor="">
          Description
          <textarea
            value={project.description}
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
          />
        </label>
        <button className='btn-primary' onClick={handleUpdate} type="submit">Update Project</button>
      </form>
        <br />
        <br />
      <h1>Allocated Members</h1>
      <div className='allocated-members'>
            
            {
              filteredMembers.map((member)=>(
                <li  key={member._id}>
                  {member.name}
                </li>
              ))
            }
      </div> 
      <br /><br />
      <div className='allocate-member-list' >
        {members.map((member) => (

        
        
          
          <div className='member-allocation' key={member._id}>
          
            <input
              type="checkbox"
              onChange={() => handleMemberSelection(member._id)}
              checked={selectedMembers.includes(member._id)}
            />
            {member.name}
          </div>
        
        )
        )}
      </div>
        <button className='btn-primary' onClick={handleAllocateMembers}>Allocate Members</button>
    </div>
  );
};

export default ProjectDetails;
