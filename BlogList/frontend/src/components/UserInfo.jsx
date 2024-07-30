import { useMatch } from "react-router-dom";

const UserInfo = ({ users }) => {
  const match = useMatch("/users/:id");

  const individualUser = match
    ? users.find((user) => user.id === match.params.id)
    : null;


  if (!individualUser) {
    return <p>hi</p>;
  }

  return (
    <div>
      <h2>Blogs added by {individualUser.name} </h2>
      <ul className="blogsContainer">
        {individualUser.blogs.map((blog) => (
          <li key={blog.title}>•{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserInfo;
