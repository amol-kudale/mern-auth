import React from 'react'
import '../assets/projectcard.css'
import { imageUrls } from '../assets/resources/ProjectImage'

const ProjectCard = ({name, description, type, address, city, state, onClick}) => {

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * imageUrls.length);
        return imageUrls[randomIndex];
    }

  return (
    <>
        <div className="project-card" onClick={onclick}>
            <div className="project-img-card">
                <img src={getRandomImage()} alt="Project" className='project-img' />
            </div>
            <h5 >{name}</h5>
            <p className=' font-medium   '>{type}</p>
            <p>{address}</p>
            <p>{city}</p>
        </div>
    </>
  )
}

export default ProjectCard