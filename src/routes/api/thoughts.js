const { Router } = require("express");

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThoughtById,
  deleteThoughtById,
} = require("../../controllers/api/thoughts");

const router = Router();

router.get("/", getAllThoughts);
router.get("/:id", getThoughtById);
router.post("/", createThought);
router.put("/:id", updateThoughtById);
router.delete("/:id", deleteThoughtById);

module.exports = router;
