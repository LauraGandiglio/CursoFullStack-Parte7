import { useState } from "react";
import { useMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addVotes } from "../reducers/blogsReducer";

import { BiSolidLike } from "react-icons/bi";

import Comments from "./CommentsForm";

const BlogInfo = ({ blogs, user, deleteBlog }) => {
  const match = useMatch("/blogs/:id");

  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;
  const [userLikes, setUserLikes] = useState(blog?.likes);

  const dispatch = useDispatch();

  const updatedBlog = {
    title: blog?.title,
    author: blog?.author,
    url: blog?.url,
    user: blog?.user?.id,
    id: blog?.id,
    likes: userLikes + 1,
  };

  const addLike = () => {
    setUserLikes(userLikes + 1);
    dispatch(addVotes(updatedBlog));
  };
  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>
        &quot;{blog.title}&quot; by <b>{blog.author}</b>
      </h2>
      <div className="blogsContainer">
        <p>Url: {blog.url}</p>
        <div className="likes">
          <p>Likes: {userLikes}</p>
          <button onClick={addLike} className="likeButton logout">
            <BiSolidLike />
          </button>
        </div>
        <p>Creator: {blog.user ? blog.user.username : "Unattributed"} </p>
        {blog.user?.username == user.username && (
          <button onClick={() => deleteBlog(blog.id, blog)}>Delete</button>
        )}
      </div>
      <div className="commentsView">
        <h2>Comments</h2>

        <ul className="blogsContainer">
          {blog.comments.map((comment) => {
            return <li className="comment"  key={comment}>• {comment}</li>;
          })}
        </ul>
        <Comments blog={blog} />
      </div>
    </div>
  );
};

export default BlogInfo;
