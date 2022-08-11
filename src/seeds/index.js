require("dotenv").config();
const mongoose = require("mongoose");

const connectToDatabase = require("../config/connection");

const { user, thought } = require("../models");
const users = require("./users.json");
const thoughts = require("./thoughts.json");

const init = async () => {
  try {
    // establish a connection with database
    await connectToDatabase();

    console.log("[INFO]: Successfully connected to DB");

    await user.deleteMany({});
    await user.insertMany(users);
    console.log("[INFO]: Successfully seeded users");

    await thought.deleteMany({});
    await thought.insertMany(thoughts);

    const thoughtsFromDb = await thought.find({});
    const usersFromDb = await user.find({});

    // seed Thoughts
    const thoughtPromises = thoughtsFromDb.map(async (thought) => {
      const username = thought.userName;
      const saveUser = usersFromDb.find((user) => user.userName === username);
      saveUser.thoughts.push(thought._id.toString());
      await user.findByIdAndUpdate(saveUser._id, { ...saveUser });
    });
    await Promise.all(thoughtPromises);
    console.log("[INFO]: Successfully seeded thoughts");
  } catch (error) {
    console.log(`[ERROR]: Failed to seed DB | ${error.message}`);
  }

  process.exit(0);
};

init();
