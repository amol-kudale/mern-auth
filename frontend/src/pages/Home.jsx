import React, { useEffect, useState } from 'react'
import {  useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'

import '../assets/homePageStyle.css'
import ProjectCard from '../components/ProjectCard';
import { Link } from 'react-router-dom';

import { IoIosAddCircleOutline } from "react-icons/io";

const Home = () => {

  const { currentUser } = useSelector((state) => state.user);
  const currentUserId = currentUser ? currentUser._id : null;

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleProjectClick = (projectId) => {
    navigate(`/project-details/${projectId}`);
  }


  return (
    <>
      <div className="home-name-heading flex justify-between items-center max-w-6xl mx-auto p-3 mt-7 bg-custom-white border-b-16 border-blue-400 ">
        <h1 className="text-xl font-medium ml-5">
        Welcome, {currentUser.username}
        </h1>
      </div>
      <div className="home-project-list flex flex-wrap justify-center">
        {loading ? (
          <p>Loading projects...</p>
        ) : error ? (
          <p>Error fetching projects: {error.message}</p>
        ) : projects.length > 0 ? (
          projects.map((item) => (
           
            <Link to={`/project-details/${item._id}`} key={item._id}>

              <ProjectCard
                key={item._id}
                name={item.name}
                type = {item.type}
                address = {item.address}
                city = {item.city}
                state={ item.state}
                description={item.description}
                // onClick={() => {navigate(`/create-project/${item._id}`)}}
              />
            </Link>
            
          ))
        ) : (
          <h4>Oops.. Something went wrong</h4>
        )}
        <Link to='/create-project'>
          <div className='project-add-card'>
            <IoIosAddCircleOutline className='project-add-card-icon' />
          </div>
        </Link>
      </div>
    </>
  );
}

export default Home