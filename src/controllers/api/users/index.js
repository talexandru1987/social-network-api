const { user, thought } = require("../../../models");

const getAllUsers = async (req, res) => {
  try {
    const users = await user.find({});

    return res.json({ data: users });
  } catch (error) {
    console.log(`[Error]: Failed to get all users | ${error.message}`);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const aUser = await user.findById(id);

    if (!aUser) {
      return res.status(404).json({ success: false });
    }

    return res.json({ data: aUser });
  } catch (error) {
    console.log(`[Error]: Failed to get user | ${error.message}`);
  }
};

const createUser = async (req, res) => {
  try {
    const { userName, email } = req.body;

    if (userName && email) {
      await user.create({ userName, email });
      return res.json({ success: true });
    } else {
      return res.status(400).json({
        success: false,
        error: `Please enter valid username and email`,
      });
    }
  } catch (error) {
    console.log(`[ERROR]: Failed to create new user | ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, email } = req.body;
    if (userName || email) {
      await user.findByIdAndUpdate(id, {
        userName,
        email,
      });
      return res.json({ success: true });
    } else res.status(500).json({ success: false });
  } catch (error) {
    console.log(`[ERROR]: Failed to update user | ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const aUser = await user.findById(id);
    const userThoughts = aUser.thoughts;

    await thought.deleteMany({ _id: userThoughts });

    try {
      await user.findByIdAndDelete(id);
      return res.json({ success: true });
    } catch (error) {
      console.log(`[ERROR]: Failed to delete user | ${error.message}`);
      return res.status(500).json({ success: false, error: error.message });
    }
  } catch (error) {
    console.log(`[Error]: Failed to get user | ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
