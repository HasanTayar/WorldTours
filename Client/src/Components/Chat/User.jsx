import React from 'react';
import './SCSS/user.scss';

export default function User({ user, handleUserClick }) {
  return (
    <div className="user" onClick={() => handleUserClick(user)}>
      <h2>{user.firstName} {user.lastName}</h2>
      {user.hasNewMessage && <i className="fas fa-comment"></i>}
      <img src={user.photo} alt="Profile" className="user-photo" />
    </div>
  );
}
