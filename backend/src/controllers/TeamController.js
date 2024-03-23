const TeamModel = require("../models/TeamModel");
const UserModel = require("../models/UserModel");


const CreateTeam = async (req, res) => {
  try {
    const { name   } = req.body;
    

    // const uniqueUsers = await UserModel.find({
    //   _id: { $in: userIds },
    //   available: true,
    // }).distinct("domain");

    // if (uniqueUsers.length !== userIds.length) {
    //   return res
    //     .status(400)
    //     .json({
    //       message: "Selected users must have unique domains and availability",
    //     });
    // }

    const newTeam = await TeamModel.create({ name });
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTeamById = async (req, res) => {
  try {
    const id = req.params.id;
    const team = await TeamModel.findById(id).populate("users");
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json({ status: "success", team: team });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllTeams = async (req, res) => {
  try {
    const team = await TeamModel.find();
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json({ status: "success", team: team });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const UpdateUsersList = async (req, res) => {
  try {
    const { userList   } = req.body;
    const id =req.params.id
  
    const uniqueUsers = await UserModel.find({
      _id: { $in: userList },
      available: true,
    }).distinct("domain");

    if (uniqueUsers.length !== userList.length) {
      return res
        .status(400)
        .json({
          message: "Selected users must have unique domains and availability",
        });
    }

    const newTeam = await TeamModel.findByIdAndUpdate(id, { users: userList },
    { new: true, upsert: true });
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { CreateTeam, getTeamById,getAllTeams,UpdateUsersList };
