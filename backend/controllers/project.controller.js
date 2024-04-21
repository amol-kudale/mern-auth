import { User, Project } from "../models/user.model.js";

export const createProject = async (req, res, next) => {
  const { name, type, address, city, description } = req.body;
  const userId = req.params.id;

  try {
    // Create a new project
    const newProject = new Project({
      name: name,
      type: type,
      address: address,
      city: city,
      description: description,
    });

    // Save the project to the database
    await newProject.save();

    // Update the createdProjects field of the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the new project's ID to the createdProjects array of the user
    user.createdProjects.push(newProject._id);

    // Save the updated user object
    await user.save();

    // Respond with success message
    res.status(201).json({ message: "Project created successfully" });
  } catch (error) {
    // Handle errors
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  const { wingDetails } = req.body;
  const projectId = req.params.id;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        wingDetails: wingDetails,
      },
      { new: true }
    );

    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
};
