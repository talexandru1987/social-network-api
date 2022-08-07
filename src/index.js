require("dotenv").config();

const express = require("express");

const connectToDatabase = require("./config/connection");

const routes = require("./routes");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

const init = async () => {
  // establish a connection with database
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

init();
