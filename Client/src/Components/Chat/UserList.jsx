import React from 'react';
import User from './User';
import './SCSS/userList.scss';

export default function UserList({ users, handleUserClick }) {

  return (
    <div >
      {users.map((user) => (
        <User key={user._id} user={user} handleUserClick={handleUserClick} /> 
      ))}
    </div>
  );
}
