import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Name must be require"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "email must be require"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password must be require"],
      minlength: [6, "Password must be at least 6 character"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  let user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    } else {
      user.password = hash;
      next();
    }
  });
});

const User = mongoose.model("User", userSchema);
export default User;
