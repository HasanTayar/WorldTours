import React from 'react';
import './SCSS/user.scss';
const userRole = (user) =>{
  if(user.isAdmin){
    return "Admin"
  }else if(user.isOrganizer && !user.isAdmin){
    return "Organizer"
  }else{
    return "Tourist"
  }
}
export default function User({ user, handleUserClick }) {
  return (
    <div className="user" onClick={() => handleUserClick(user)}>
       <img src={user.photo} alt="Profile" className="user-photo" />
      <h2>{user.firstName} {user.lastName} 
        <br/>Role:{userRole(user)}
      </h2>
      {user.hasNewMessage && <i className="fas fa-comment"></i>}

    </div>
  );
}
