  import React from 'react';
  import './SCSS/user.scss';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faComment } from '@fortawesome/free-solid-svg-icons';

  const User = ({ user, handleUserClick, selectedUser, isCurrentUser }) => {
    const userRole = () => {
      if (user.isAdmin) {
        return "Admin";
      } else if (user.isOrganizer && !user.isAdmin) {
        return "Organizer";
      } else {
        return "Tourist";
      }
    };

    return (
      <div
        className={`user ${selectedUser && selectedUser._id === user._id ? 'active' : ''}`}
        onClick={() => handleUserClick(user)}
      >
        <img src={user.photo} alt="Profile" className="user-photo" />
        <h2>
          {user.firstName} {user.lastName} <br />Role: {userRole()}
        </h2>
      </div>
    );
  };

  export default User;
