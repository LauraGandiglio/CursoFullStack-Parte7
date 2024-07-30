import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    voteBlog(state, action) {
      const id = action.payload;
      const blogToChange = state.find((n) => n.id === id);
      const changedBlog = {
        ...blogToChange,
        votes: blogToChange.votes + 1,
      };
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      const { id } = updatedBlog;
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog));
    },
  },
});

export const { voteBlog, appendBlog, setBlogs, updateBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    //const sortBlogs = blogs.sort((a, b) => b.likes - a.likes);
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const addVotes = (blog) => {
  return async (dispatch) => {
    const votedBlog = await blogService.update(blog.id, blog);
    dispatch(voteBlog(votedBlog.id));
  };
};

export const deleteBlogReduc = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    const newBlogs = await blogService.getAll();
    dispatch(setBlogs(newBlogs));
  };
};

export const createComment = (id, comment) => {
  return async (dispatch) => {
    try {
      const commentedBlog = await blogService.addComment(id, comment);
      dispatch(updateBlog(commentedBlog));
    } catch (error) {
      console.log("error al crear comentario");
    }
  };
};
export default blogSlice.reducer;
