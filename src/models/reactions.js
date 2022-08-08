const { Schema } = require("mongoose");
const moment = require("moment");

const reactionSchema = {
  reactionBody: {
    type: String,
    required: true,
    maxLength: 270,
  },
  userName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: moment(),
  },
};

const schema = new Schema(reactionSchema, {
  toJSON: {
    getters: true,
  },
  id: false,
});

module.exports = schema;
