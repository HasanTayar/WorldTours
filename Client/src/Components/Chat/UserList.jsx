import React from "react";
import User from "./User";
import "./SCSS/userList.scss";

const UserList = ({ users, handleUserClick, selectedUser, currentUserID }) => {
  // Sort users by the timestamp of their latest message
  const sortedUsers = [...users].sort((a, b) => b.latestMessage?.timestamp - a.latestMessage?.timestamp);

  return (
    <div>
      {sortedUsers.map((user) => {
        const isCurrentUser = user._id === currentUserID;

        return (
          <User
            key={user._id}
            user={user}
            handleUserClick={handleUserClick}
            selectedUser={selectedUser}
            isCurrentUser={isCurrentUser}
          />
        );
      })}
    </div>
  );
};

export default UserList;
