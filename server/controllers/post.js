import express from "express";
import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js";
import User from "../models/user.js";

const router = express.Router();

export const getPosts = async (req, res) => {
  const { page,category } = req.query;

  try {
    const LIMIT = 108;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await PostMessage.countDocuments({});
    let posts = [];
    if(category === ""){
       posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    }else{
      posts = await PostMessage.find({category})
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    }
  
    res.json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  
  try {
    const title = new RegExp(searchQuery, "i");

    const posts = await PostMessage.find({ $or: [{ title }] });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsByCreator = async (req, res) => {
  const { id } = req.query;

  try {
    const posts = await PostMessage.find({ creator:id });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id).populate('user');
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body?.postData;
  const newPostMessage = new PostMessage({
    ...post,
    user: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPostMessage.save();
    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, avatar, name, selectedFile, category } =
    req.body?.postData;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = {
    creator,
    name,
    avatar,
    title,
    message,
    category,
    selectedFile,
    _id: id,
  };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json({ data: updatedPost });
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.status(200).json(updatedPost);
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await PostMessage.findById(id);

  post.comments.push(value);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export default router;
