import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBook, faComments, faShoppingCart, faSignOutAlt,  faDatabase } from "@fortawesome/free-solid-svg-icons";
import "./AdminSidebar.css";

const AdminSidebar = ({ user , onLogout}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
  
      <div className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="admin-profile">
          <img src={user && user.photo} alt="Admin" className="admin-photo" />
        </div>
        <p style={{textAlign:"center"}}>{user.firstName + " " + user.lastName}</p>
        <Nav vertical>
        <NavItem>
            <Link to="/admin" className="nav-link">
              <FontAwesomeIcon icon={faDatabase} className="icon" />
            Visualization
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/admin/users" className="nav-link">
              <FontAwesomeIcon icon={faUser} className="icon" />
              Users
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/admin/tours" className="nav-link">
              <FontAwesomeIcon icon={faBook} className="icon" />
              Tours
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/admin/chats" className="nav-link">
              <FontAwesomeIcon icon={faComments} className="icon" />
              Chat Rooms
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/admin/orders" className="nav-link">
              <FontAwesomeIcon icon={faShoppingCart} className="icon" />
              Orders
            </Link>
          </NavItem>
          <NavItem onClick={onLogout} className="nav-link">
              <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
              Logout
          </NavItem>
        </Nav>
      </div>
    </>
  );
};

export default AdminSidebar;
