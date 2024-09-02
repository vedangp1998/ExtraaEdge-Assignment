import { useEffect, useState } from "react";
import UserItem from "./UserItem";
import LoadingIndicator from "./LoadingIndicator";
import "./User.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const usersData = await response.json();
      setUsers(usersData);
      setIsLoading(false);
    }

    fetchUsers();
  }, []);

  const handleDelete = (username) => {
    const updatedUsers = users.filter((user) => user.username !== username);
    setUsers(updatedUsers);
  };

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <ul className="Users">
          {users.map((user) => (
            <UserItem key={user.id} users={user} onDelete={handleDelete} />
          ))}
        </ul>
      )}
    </>
  );
};

export default Users;
