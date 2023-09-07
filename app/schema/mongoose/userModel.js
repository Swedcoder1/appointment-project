// import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

// const { Schema } = mongoose;

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
});

const User = models.User || model("User", userSchema);

export default User;
