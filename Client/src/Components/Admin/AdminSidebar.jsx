import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBook, faComments, faShoppingCart, faSignOutAlt, faDatabase, faBars , faCog} from "@fortawesome/free-solid-svg-icons";

import "./AdminSidebar.css";

const AdminSidebar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleResize = () => {
    setIsOpen(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="admin-profile">
          {isOpen && <img src={user && user.photo} alt="Admin" className="admin-photo" />}
        </div>
        {isOpen && <p style={{textAlign:"center"}}>{user.firstName + " " + user.lastName}</p>}
        <Nav vertical>
          <NavItem>
            <Link to="/admin" className="nav-link">
              <FontAwesomeIcon icon={faDatabase} className="icon" />
              <span>Visualization</span>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/admin/users" className="nav-link">
              <FontAwesomeIcon icon={faUser} className="icon" />
              <span>Users</span>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/admin/tours" className="nav-link">
              <FontAwesomeIcon icon={faBook} className="icon" />
              <span>Tours</span>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/admin/chats" className="nav-link">
              <FontAwesomeIcon icon={faComments} className="icon" />
              <span>Chat Rooms</span>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/admin/orders" className="nav-link">
              <FontAwesomeIcon icon={faShoppingCart} className="icon" />
              <span>Orders</span>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/profile" className="nav-link">
              <FontAwesomeIcon icon={faCog} className="icon" />
              <span>Settings</span>
            </Link>
          </NavItem>
          <NavItem onClick={onLogout} className="nav-link">
            <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
            <span>Logout</span>
          </NavItem>
        </Nav>
      </div>
    </>
  );
};

export default AdminSidebar;
