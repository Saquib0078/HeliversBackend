const UserModel = require("../models/UserModel");

const UserPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  const searchQuery = req.query.search || "";
  const genderFilter = req.query.gender || "";
  const availabilityFilter = req.query.availability || "";
  const domainFilter = req.query.domain || "";

  try {
    let query = UserModel.find();
    let queryObj = {};

    if (searchQuery) {
      queryObj = {
        ...queryObj,
        $or: [
          { first_name: { $regex: searchQuery, $options: "i" } },
          { last_name: { $regex: searchQuery, $options: "i" } },
        ],
      };
    }

    if (genderFilter) {
      queryObj = {
        ...queryObj,
        gender: genderFilter,
      };
    }

    if (availabilityFilter === "true" || availabilityFilter === "false") {
      queryObj = { ...queryObj, available: availabilityFilter };
    }

    if (domainFilter) {
      queryObj = {
        ...queryObj,
        domain: { $regex: domainFilter, $options: "i" },
      };
    }

    const finalQuery = query.find(queryObj);

    const users = await finalQuery.skip(skip).limit(limit).exec();
    const totalUsersCount = await UserModel.countDocuments();
    res
      .status(200)
      .json({ status: "success", user: users, totalUser: totalUsersCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const findUser = await UserModel.findOne({ _id: id });

    if (!findUser)
      return res.status(400).json({ message: "No User Found With This Id" });

    res.status(200).json({ status: "success", user: findUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createNewUser = async (req, res) => {
  try {
    const { first_name, last_name, email, gender, avatar, domain } = req.body;

    const newUser = new UserModel({
      first_name,
      last_name,
      email,
      gender,
      avatar,
      domain,
    });

    const savedUser = await newUser.save();

    res.status(201).json({ status: "success", user: savedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).json({ status: "success", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await UserModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ status: "success", message: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//

module.exports = {
  UserPagination,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
};
