import { User, TeamUser } from "../models/user.model.js";
// import {  useSelector } from "react-redux";


export const createMember = async (req, res, next) => {
    const { name, role, contact, email, currentUserId} = req.body;
    // const userId = req.params.id;
    // const { currentUser } = useSelector((state) => state.user);
    // const userId = currentUser._id ;
    console.warn(name, role, contact, email, currentUserId)
    // userId = userId.to       tring();
    
        //Create new member 
        const newMember = new TeamUser({
            name: name,
            role: role,
            contact: contact,
            email: email,
            userId:  currentUserId,
            
        })
        try{
            await newMember.save();
            res.status(201).json({message: "Member created succesfully"})
        } catch (error) {
            next(error);
            console.log(error)
        }
  
}




// Controller to show members by userId
export const showMembers = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const members = await TeamUser.find({ userId });
    res.status(200).json(members);
  } catch (error) {
    next(error);
  }
};




// Controller to search members by userId and key
export const searchMembers = async (req, res, next) => {
  const { userId, key } = req.query;
  try {
    const regex  = new RegExp(key, 'i');
    const members = await TeamUser.find({
      userId,
      $or: [
        { name: { $regex: key } },
        { role: { $regex: key } },
        { contact: { $regex: key } },
        { email: { $regex: key} }
      ]
    });
    res.status(200).json(members);
  } catch (error) {
    next(error);
  }
};


export const deleteMember = async (req, res) =>{
  const result = await TeamUser.deleteOne({_id:req.params.memberId})
  res.send(result);
}