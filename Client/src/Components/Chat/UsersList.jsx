import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
// import { getAllUsers } from '../../Services/userService';

const UsersList = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  // const fetchUsers = async () => {
  //   const fetchedUsers = await getAllUsers();
  //   setUsers(fetchedUsers);
  // };

  const handleUserSelect = (user) => {
    onUserSelect(user);
  };

  return (
    <ListGroup className="users-list">
      {users.map((user) => (
        <ListGroup.Item key={user._id} onClick={() => handleUserSelect(user.username)}>
          {user.username}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default UsersList;
