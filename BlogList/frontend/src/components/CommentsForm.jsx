import { useField } from "../hooks/index";
import { useDispatch } from "react-redux";
import { createComment } from "../reducers/blogsReducer";

const Comments = ({ blog }) => {
  const { reset: resetComment, ...comment } = useField("text");

  const dispatch = useDispatch();

  const handleComment = (event) => {
    event.preventDefault();

    if (!comment.value.trim()) return;

    dispatch(createComment(blog.id, comment.value.trim()));
    resetComment();
  };

  return (
    <form onSubmit={handleComment}>
      <div className="loginForm login-view commentsForm" >
        Add your comment:
        <input {...comment} />
        <button type="submit">Send</button>
      </div>
      
    </form>
  );
};

export default Comments