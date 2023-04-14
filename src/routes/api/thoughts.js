const { Router } = require("express");

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThoughtById,
  deleteThoughtById,
} = require("../../controllers/api/thoughts");

const { createNewReaction, deleteReaction } = require("../../controllers/api/reactions");

const router = Router();

router.get("/", getAllThoughts);
router.get("/:id", getThoughtById);
router.post("/", createThought);
router.put("/:id", updateThoughtById);
router.delete("/:id", deleteThoughtById);
router.post("/:id/reaction", createNewReaction);
router.delete("/:thoughtId/reaction/:reactionId", deleteReaction);

module.exports = router;
