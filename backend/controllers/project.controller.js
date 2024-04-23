import { User, Project, Wing } from "../models/user.model.js";

export const createProject = async (req, res, next) => {
  const { name, type, address, city, state, description } = req.body;
  const userId = req.params.id;

  try {
    // Create a new project
    const newProject = new Project({
      name: name,
      type: type,
      address: address,
      city: city,
      state: state,
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
    res.status(201).json(newProject);
  } catch (error) {
    // Handle errors
    next(error);
  }
};

export const createWing = async (req, res, next) => {
  const { wingName, numberOfFloors, flatsPerFloor } = req.body;
  const projectId = req.params.id;

  try {
    const newWing = new Wing({
      wingName,
      numberOfFloors,
      flatsPerFloor,
    });

    await newWing.save();

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.createdWings.push(newWing._id);

    await project.save();

    res.status(201).json({ message: "Wing created successfully" });
  } catch (error) {
    next(error);
  }
};
