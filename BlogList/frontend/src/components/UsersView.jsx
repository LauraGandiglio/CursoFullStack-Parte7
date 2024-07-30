import { Link } from "react-router-dom";
import { LuMousePointerClick } from "react-icons/lu";

const Users = ({ users }) => {
  if (!users) {
    return null;
  }
  return (
    <div>
      <h2>Users</h2>
      <table className="usersTable">
        <thead>
          <tr>
            <td> User </td>
            <td>Number of blogs</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td>
                <Link className="usersLinks" to={`/users/${user.id}`}>
                  {user.username}
                  <LuMousePointerClick className="clicIcon" />
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
