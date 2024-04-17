import { User, Project } from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({ message: "API is working!" });
};

//Update User

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "Access denied"));
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

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
