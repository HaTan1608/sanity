import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";
import mongoose from "mongoose";

import User from "../models/user.js";
import PostMessage from "../models/postMessage.js";

const secret = "test";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const oldUser = await User.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      saved: [],
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, name, avatar, wallpaper } = req.body?.userData;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedUser = {
    name,
    avatar,
    wallpaper,
    _id: id,
  };
  await User.findByIdAndUpdate(id, updatedUser, { new: true });
  const oldUser = await User.findOne({ email });
  const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
    expiresIn: "1h",
  });
  console.log(oldUser);
  res.status(200).json({ result: oldUser, token });
};

export const savePost = async (req, res) => {
  const { userId, postId } = req.query;
  const user = await User.findById(userId).populate("saved");
  const alreadySaved = user.saved.filter(
    (post) => post._id.toString() === postId
  );
  if (alreadySaved.length>0) {
    console.log('1')

    alreadySaved.map((post) => user.saved.remove(post));
  } else {
    console.log('2')
    user.saved.push(postId);
  }
  const updatedUser = await User.findByIdAndUpdate(userId, user, {
    new: true,
  });
  res.status(200).json({ result: updatedUser });
};

export const getSavePost = async (req, res) => {
  const { userId } = req.query;
  try {
    const user = await User.findById(userId).populate("saved");
    res.status(200).json({ result: user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
