import { useState } from "react";
import { MdOutlineTitle } from "react-icons/md";
import { TbWriting } from "react-icons/tb";
import { TbWorldWww } from "react-icons/tb";

const NewBlogForm = ({ createBlog, user }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateBlog = (event) => {
    event.preventDefault();

    const blogObject = {
      title: title,
      author: author,
      url: url,
      user: user.username,
    };

    createBlog(blogObject);

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form className="login-view loginForm" onSubmit={handleCreateBlog}>
      <div className="loginForm-input">
        <MdOutlineTitle />
        <input
          type="text"
          placeholder="write title here"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="loginForm-input">
        <TbWriting />
        <input
          type="text"
          placeholder="write the author here"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div className="loginForm-input">
        <TbWorldWww />
        <input
          type="text"
          placeholder="write url here"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit" className="createBlog">
        Create
      </button>
    </form>
  );
};

export default NewBlogForm;
