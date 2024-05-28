import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams,  useNavigate } from 'react-router-dom';

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
      const response = await fetch(`/api/project/${projectId}`, {
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

  return (
    <div className="project-detail">
      <h1>{project.name} </h1>
      <form
       onSubmit={handleUpdate}
       >
        <input
          type="text"
          value={project.name}
          onChange={(e) => setProject({ ...project, name: e.target.value })}
        />
        <textarea
          value={project.description}
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
        />
        <button type="submit">Update Project</button>
      </form>
        <br />
        <hr />
        <br />
      <h2>Allocate Members</h2>
      <div>
        {members.map((member) => (
          <div key={member._id}>
            <input
              type="checkbox"
              checked={selectedMembers.includes(member._id)}
              onChange={() => handleMemberSelection(member._id)}
            />
            {member.name}
          </div>
        ))}
        <button onClick={handleAllocateMembers}>Allocate Members</button>
      </div>
    </div>
  );
};

export default ProjectDetails;
