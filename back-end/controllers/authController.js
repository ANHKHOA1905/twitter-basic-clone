import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ useId: user._id }, process.env.APP_SECRET);
    res.status(200).json({
      status: "success",
      data: { token, userName: user.name },
    });
  } catch (error) {
    res.json(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.boby.email });
    if (!user) {
      //Error : email is not correct
      const err = new Error("Email is not correct");
      err.statusCode = 400; // bad request;
      return next(err);
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ useId: user._id }, process.env.APP_SECRET);
      res.status(200).json({
        status: "success",
        data: { token, userName: user.name },
      });
    } else {
      //Error : password is not correct
      const err = new Error("Password is not correct");
      err.statusCode = 400; // bad request;
      return next(err);
    }
  } catch (error) {}
};

// get current user
export const getCurrentUser = async (req, res, next) => {
  try {
    const data = { user: null };
    if (req.user) {
      const user = await User.findOne({ _id: req.user.userId });
      data.user = { userName: user.name };
    }

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.json(error);
  }
};
