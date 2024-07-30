import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("The component shows the tittle and author by default, but not the likes and url", () => {
  const blog = {
    title: "Testing blog",
    author: "Laura Gandiglio",
    url: "testingblog.com",
    user: {},
    likes: 1000,
  };

  const user = {
    name: "Laura",
    username: "Laurdilla",
  };

  const updateBlogHandler = vi.fn();
  const deleteBlogHandler = vi.fn();

  render(
    <Blog
      blog={blog}
      user={user}
      updateBlog={updateBlogHandler}
      deleteBlog={deleteBlogHandler}
    />
  );

  const { container } = render(
    <Blog
      blog={blog}
      user={user}
      updateBlog={updateBlogHandler}
      deleteBlog={deleteBlogHandler}
    />
  );
  const tittle = screen.findByText("Testing blog");
  const author = screen.findByText("Laura Gandiglio");
  const div = container.querySelector(".togglableContent");

  expect(tittle).toBeDefined();
  expect(author).toBeDefined();
  expect(div).toHaveStyle("display:none");
});

test("The component shows likes and url when the View button is clicked", async () => {
  const blog = {
    title: "Testing blog",
    author: "Laura Gandiglio",
    url: "testingblog.com",
    user: {},
    likes: 1000,
  };

  const user = {
    name: "Laura",
    username: "Laurdilla",
  };

  const updateBlogHandler = vi.fn();
  const deleteBlogHandler = vi.fn();

  const { container } = render(
    <Blog
      blog={blog}
      user={user}
      updateBlog={updateBlogHandler}
      deleteBlog={deleteBlogHandler}
    />
  );
  const user2 = userEvent.setup();
  const button = screen.getByText("View");
  await user2.click(button);

  const div = container.querySelector(".togglableContent");
  expect(div).not.toHaveStyle("display: none");
});

test("Clicking the like button twice calls the event handler prop twice", async () => {
  const blog = {
    title: "Testing blog",
    author: "Laura Gandiglio",
    url: "testingblog.com",
    user: {},
    likes: 1000,
  };

  const user = {
    name: "Laura",
    username: "Laurdilla",
  };

  const updateBlogHandler = vi.fn();
  const deleteBlogHandler = vi.fn();

  const { container } = render(
    <Blog
      blog={blog}
      user={user}
      updateBlog={updateBlogHandler}
      deleteBlog={deleteBlogHandler}
    />
  );
  const user2 = userEvent.setup();
  const viewButton = screen.getByText("View");
  await user2.click(viewButton);

  const likeButton = screen.getByText("Like");
  await user2.click(likeButton);
  await user2.click(likeButton);
  expect(updateBlogHandler.mock.calls).toHaveLength(2);
});
