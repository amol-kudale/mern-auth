import {
  User,
  TeamUser,
  Project,
  Wing,
  Floor,
  Flat,
} from "../models/user.model.js";

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
      userId: userId,
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

    const createdFloors = [];
    for (let i = 1; i <= numberOfFloors; i++) {
      const newFloor = new Floor({
        floorNumber: i,
        numberOfFlats: flatsPerFloor,
        flats: [],
      });
      await newFloor.save();
      createdFloors.push(newFloor._id);
    }

    newWing.createdFloors = createdFloors;
    await newWing.save();

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.createdWings.push(newWing._id);
    await project.save();

    res.status(201).json({
      message: "Wing created successfully",
      currentWing: newWing,
    });
  } catch (error) {
    next(error);
  }
};

export const createFloor = async (req, res, next) => {
  const { floorId } = req.params;
  const flatsData = req.body;

  try {
    // Find the floor by its ID
    const floor = await Floor.findById(floorId);
    if (!floor) {
      return res.status(404).json({ message: "Floor not found" });
    }

    // Validate and create flat objects
    const flats = flatsData.flats.map((flatData) => {
      const flat = new Flat({
        flatNumber: flatData.flatNumber,
        status: flatData.status,
        bhk: flatData.bhk,
        area: flatData.area,
        price: flatData.price,
        addInfo: flatData.addInfo,
      });
      // Assuming Flat model validation is handled internally or before this step
      return flat;
    });

    // Add flats to the floor
    floor.createdFlats = flats;
    await floor.save();

    // Respond with success message
    res.status(201).json({
      message: "Floor updated successfully",
      currentFloor: floor,
    });
  } catch (error) {
    console.error("Error submitting floor:", error);
    next(error);
  }
};

export const showProject = async (req, res, next) => {
  const { userId } = req.params;
  let project = await Project.find({ userId });
  // let project = await Project.find();
  if (project.length > 0) {
    res.send(project);
  } else {
    res.send({ result: "No Project found" });
  }
};

export const getProjectById = async (req, res) => {
  try {
    // const {projectId} = req.params.projectId;
    const project = await Project.findOne({ _id: req.params.projectId });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const updateData = req.body;
    const project = await Project.findByIdAndUpdate(projectId, updateData, {
      new: true,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const allocateMembersToProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const { members } = req.body;
    project.teamMembers = members;

    await project.save();

    await Promise.all(
      members.map(async (memberId) => {
        const member = await TeamUser.findById(memberId);
        if (member) {
          if (!member.assignedProjects.includes(project._id)) {
            member.assignedProjects.push(project._id);
            await member.save();
          }
        }
      })
    );
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const getWingDetails = async (req, res) => {
  try{
    const wing = await Wing.findOne({_id:req.params.wingId})
    if(!wing){
      return res.status(404).json({message: 'Project wing not found'});
    }
    res.json(wing);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
} 