import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewBlogForm from "./NewBlogForm";

test("The form calls the handler once and sends the correct data", async () => {
  const createBlog = vi.fn();
  const user = {
    name: "Laura",
    username: "Laurdilla",
  };
  const user2 = userEvent.setup();

  render(<NewBlogForm createBlog={createBlog} user={user} />);

  const titleInput = screen.getByPlaceholderText("write title here");
  const authorInput = screen.getByPlaceholderText("write the author here");
  const urlInput = screen.getByPlaceholderText("write url here");
  const createButton = screen.getByText("Create");

  await user2.type(titleInput, "Testing blogForm");
  await user2.type(authorInput, "Laurita");
  await user2.type(urlInput, "hithere.com");
  await user2.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("Testing blogForm");
  expect(createBlog.mock.calls[0][0].author).toBe("Laurita");
  expect(createBlog.mock.calls[0][0].url).toBe("hithere.com");
});
