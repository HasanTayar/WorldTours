import React from 'react';
import './SCSS/user.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const userRole = (user) => {
  if (user.isAdmin) {
    return 'Admin';
  } else if (user.isOrganizer && !user.isAdmin) {
    return 'Organizer';
  } else {
    return 'Tourist';
  }
};

export default function User({ user, handleUserClick, selectedUser, unreadCount }) {
  const isSelected = selectedUser && selectedUser._id === user._id;
  return (
    <div
      className={`user ${isSelected ? 'selected' : ''}`}
      onClick={() => handleUserClick(user)}
    >
      <img src={user.photo} alt="Profile" className="user-photo" />
      <h2>
        {user.firstName} {user.lastName}
        <br />Role: {userRole(user)}
      </h2>
      {unreadCount > 0 && (
        <span className="unread-count">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </div>
  );
}
