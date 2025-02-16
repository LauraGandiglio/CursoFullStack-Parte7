const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, require: true },
  author: String,
  url: { type: String, require: true },
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: {
    type: Array,
    default: [],
  },
});

blogSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
