import { LuMousePointerClick } from "react-icons/lu";

import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <div className="blogs">
      <Link className="blog" to={`/blogs/${blog.id}`}>
        &quot;{blog.title}&quot; by <b>{blog.author}</b>
        <LuMousePointerClick className="clicIcon" />
      </Link>
    </div>
  );
};

export default Blog;
