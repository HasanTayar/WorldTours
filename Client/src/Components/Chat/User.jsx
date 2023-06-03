import React from 'react';
import './SCSS/user.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const userRole = (user) => {
  if (user.isAdmin) {
    return "Admin";
  } else if (user.isOrganizer && !user.isAdmin) {
    return "Organizer";
  } else {
    return "Tourist";
  }
}

export default function User({ user, handleUserClick, unreadCount }) {
  console.log(unreadCount);
  return (
    <div className="user" onClick={() => handleUserClick(user)}>
      <img src={user.photo} alt="Profile" className="user-photo" />
      <h2>
        {user.firstName} {user.lastName} 
        <br/>Role: {userRole(user)}
      </h2>
      {unreadCount > 0 && <span>{unreadCount}</span>}
    </div>
  );
}
