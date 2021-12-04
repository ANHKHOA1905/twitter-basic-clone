import Post from "../models/Post.js";

// get all post
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}).populate("author");
    res.status(200).json({
      status: "success",
      results: posts.length,
      data: { posts },
    });
  } catch (error) {
    res.json(error);
  }
};

// create one post
export const createOnePost = async (req, res, next) => {
  try {
    const { useId } = req.user;
    const post = await Post.create({ ...req.body, author: userId });
    res.status.json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error) {
    res.json(error);
  }
};

// update one post
export const updateOnePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByIdAndUpdate(
      postId,
      { ...res.body },
      { new: true, runValidator: true }
    );
    res.status(200).json({
      status: "sucess",
      data: { post },
    });
  } catch (error) {
    res.json(error);
  }
};

// delete onr post
export const deleteOnePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    await Post.findByIdAndDelete(postId);
    res.status(200).json({
      status: "success",
      data: "Post has been deleted",
    });
  } catch (error) {
    res.json(error);
  }
};
