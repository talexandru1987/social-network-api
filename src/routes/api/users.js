const { Router } = require("express");

const {
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} = require("../../controllers/api/users");

const router = Router();

router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

module.exports = router;
