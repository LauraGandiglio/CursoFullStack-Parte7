import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Routes, Route } from "react-router-dom";

import NavBar from "./components/navBar";
import Blog from "./components/Blog";
import NewBlogForm from "./components/NewBlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Toggable";
import Notification from "./components/Notification";
import Users from "./components/UsersView";
import UserInfo from "./components/UserInfo";
import BlogInfo from "./components/BlogInfo";

import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/users";

import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog } from "./reducers/blogsReducer";
import { setUser } from "./reducers/userReducer";

const App = () => {
  const navigate = useNavigate();

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogsUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    userService.getAllUsers().then((users) => setUsers(users));
  }, [blogs]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogsUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
      dispatch(setNotification(null));
      navigate("/logged");
    } catch {
      dispatch(setNotification("Wrong username or password"));
    }
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blogObject));
    dispatch(
      setNotification(
        `The blog - ${blogObject.title} by ${blogObject.author} - was created successfully `
      )
    );
    await blogService.getAll().then(() => dispatch(initializeBlogs()));
  };

  const deleteBlog = async (id, blog) => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      await blogService.deleteBlog(id);
      dispatch(initializeBlogs());
      dispatch(
        setNotification(
          `The blog -"${blog.title}" by ${blog.author}- was deleted successfully`
        )
      );
      navigate("/logged");
    }
  };

  const closeSesion = () => {
    window.localStorage.removeItem("loggedBlogsUser");
    dispatch(setUser(null));
    navigate("/");
  };

  return (
    <>
      <div className="App">
        <Routes>
          <Route
            path="/blogs/:id"
            element={
              <div className="individualBlog homeView">
                <NavBar user={user} closeSesion={closeSesion} />
                <BlogInfo blogs={blogs} user={user} deleteBlog={deleteBlog} />
              </div>
            }
          />
          <Route
            path="/logged"
            element={
              <div className="homeView">
                <NavBar user={user} closeSesion={closeSesion} />
                <div>
                  <h2>blogs</h2>
                  <div className="blogsContainer">
                    {blogs.map((blog) => (
                      <Blog
                        key={blog.id}
                        blog={blog}
                        user={user}
                        deleteBlog={deleteBlog}
                      />
                    ))}
                  </div>
                </div>
                <h2>Create new blog</h2>
                <Togglable
                  buttonLabel1="Create blog"
                  buttonLabel2="Cancel"
                  ref={blogFormRef}
                >
                  <NewBlogForm createBlog={addBlog} user={user} />
                </Togglable>{" "}
                <Notification />
              </div>
            }
          />
          <Route
            path="/"
            element={
              <div className="login-view">
                <h2>The Bloglist App</h2>
                <Notification />
                <LoginForm
                  handleLogin={handleLogin}
                  handleUsername={({ target }) => setUsername(target.value)}
                  handlePassword={({ target }) => setPassword(target.value)}
                  username={username}
                  password={password}
                />
              </div>
            }
          />
          <Route
            path="/users"
            element={
              user ? (
                <div className="homeView">
                  <NavBar user={user} closeSesion={closeSesion} />
                  <Users users={users} />
                </div>
              ) : (
                <p>ruta invalida, ingrese usuario</p>
              )
            }
          />
          <Route
            path="/users/:id"
            element={
              <div className="homeView">
                <NavBar user={user} closeSesion={closeSesion} />
                <UserInfo users={users} />
              </div>
            }
          />
        </Routes>
      </div>
    </>
  );
};
export default App;
