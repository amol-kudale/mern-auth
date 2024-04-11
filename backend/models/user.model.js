import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA8cTn1-RRcQ_T4-cf40vYi4sjFEADIdog1TqwvXO3kw&s",
    },
  },
  { timestamps: true }
);

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  accessPermissions: {
    type: [String], //access permissions as an array of strings
    default: [],
  },
});

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  teamMembers: {
    type: [teamMemberSchema], // Define team members as an array of teamMemberSchema
    default: [],
  },
});

const wingSchema = new mongoose.Schema({
  wingName: {
    type: String,
    required: true,
  },
  numberOfFloors: {
    type: Number,
    required: true,
  },
});

const flatSchema = new mongoose.Schema({
  flatNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "booked", "blocked", "held"],
    default: "available",
  },
});

const floorSchema = new mongoose.Schema({
  floorNumber: {
    type: Number,
    required: true,
  },
  flats: {
    type: [flatSchema], // Define flats as an array of flatSchema
    default: [],
  },
});

//schema for assignment (assigning project to team members)
// const assignmentSchema = new mongoose.Schema({
//   project: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Project",
//     required: true,
//   },
//   teamMember: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "TeamMember",
//     required: true,
//   },
// });

// Create models based on the schemas
const User = mongoose.model("User", userSchema);
const TeamMember = mongoose.model("TeamMember", teamMemberSchema);
const Project = mongoose.model("Project", projectSchema);
const Wing = mongoose.model("Wing", wingSchema);
const Floor = mongoose.model("Floor", floorSchema);
const Flat = mongoose.model("Flat", flatSchema);
// const Assignment = mongoose.model("Assignment", assignmentSchema);

export { User, TeamMember, Project, Wing, Floor, Flat };

export default User;
