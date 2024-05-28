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
    createdProjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  { timestamps: true }
);

const teamUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    default: "",
  },
  // otp: {
  //   type: Number,
  //   require: true,
  // },
  // otpExpiration: {
  //   type: Date,

    // default: () => new Date(new Date().getTime() + 5 * 60 * 1000),
  // },
  // verified: {
  //   type: Boolean,
  //   default: false,
  // },
  password: {
    type: String,
    default: "",
  },
});

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  userId: {
    type: String,
    default: "",
  },
  createdWings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wing",
    },
  ],
  teamMembers: {
    type: [{type: mongoose.Schema.Types.ObjectId, ref:'TeamUser'}],
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
  flatsPerFloor: {
    type: Number,
    required: true,
  },
  createdFloors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Floor",
    },
  ],
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
  bhk: {
    type: Number,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  addInfo: {
    type: String,
  },
});

const floorSchema = new mongoose.Schema({
  floorNumber: {
    type: Number,
    required: true,
  },
  numberOfFlats: {
    type: Number,
    required: true,
  },
  createdFlats: {
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
const TeamUser = mongoose.model("Teammember", teamUserSchema);
const Project = mongoose.model("Project", projectSchema);
const Wing = mongoose.model("Wing", wingSchema);
const Floor = mongoose.model("Floor", floorSchema);
const Flat = mongoose.model("Flat", flatSchema);
// const Assignment = mongoose.model("Assignment", assignmentSchema);

export { User, TeamUser, Project, Wing, Floor, Flat };

export default User;
