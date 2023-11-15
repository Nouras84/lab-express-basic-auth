// const { Schema, model } = require("mongoose");

// // TODO: Please make sure you edit the user model to whatever makes sense in this case
// const userSchema = new Schema({
//   username: {
//     type: String,
//     unique: true
//   },
//   password: String
// });

// const User = model("User", userSchema);

// module.exports = User;

const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
});

// Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const User = model("User", userSchema);

module.exports = User;
