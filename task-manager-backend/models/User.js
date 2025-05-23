const mongoose = require("mongoose");

// User schema with name, unique email, and hashed password
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
