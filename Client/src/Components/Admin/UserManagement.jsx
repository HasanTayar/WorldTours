import {
  Table,
  Button,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faEnvelope,
  faArrowUp,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import classnames from "classnames";
import "./UserManagement.css";
import {
  fetchAllUsers,
  setAdmin,
  setOrgainzer,
  deleteUserProfile,
} from "../../Services/userService";

function UserManagement({ user }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("1");
  const currentUserID = user._id;

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    fetchAllUsers().then((users) => setUsers(users));
  }, []);
  const handleSetAdmin = async (userId) => {
    await setAdmin(userId);
    const updatedUsers = await fetchAllUsers();
    setUsers(updatedUsers);
  };

  const handleSetOrganizer = async (userId) => {
    await setOrgainzer(userId);
    const updatedUsers = await fetchAllUsers();
    setUsers(updatedUsers);
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <Input
        type="search"
        placeholder="Search for a user..."
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggleTab("1");
            }}
          >
            All Users
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggleTab("2");
            }}
          >
            Organizer Requests
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Table bordered>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users
                  .filter((user) => user._id !== currentUserID)
                  .filter(
                    (user) =>
                      user.firstName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      user.lastName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  )
                  .map((user, index) => (
                    <tr key={index}>
                      <td>{user.firstName + " " + user.lastName}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.isAdmin
                          ? "Admin"
                          : user.isOrganizer
                          ? "Organizer"
                          : "Normal User"}
                      </td>
                      <td>
                        <Button color="primary" className="action-button">
                          <FontAwesomeIcon icon={faEnvelope} className="icon" />
                          Contact
                        </Button>

                        {!user.isAdmin && (
                          <Button
                            color="warning"
                            className="action-button"
                            onClick={(e) => {
                              e.preventDefault();
                              handleSetAdmin(user._id);
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faArrowUp}
                              className="icon"
                            />
                            Promote to Admin
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        </TabPane>
        <TabPane tabId="2">
          <Table bordered>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>CV</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users
                  .filter(
                    (user) =>
                      user._id !== currentUserID && user.organizerRequest
                  )
                  .filter(
                    (user) =>
                      user.firstName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      user.lastName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  )
                  .map((user, index) => (
                    <tr key={index}>
                      <td>{user.firstName + " " + user.lastName}</td>
                      <td>{user.email}</td>
                      <td>
                        <Button
                          color="info"
                          className="action-button"
                          onClick={() =>
                            window.open(
                              `http://localhost:3000/Cv/${user.organizerCV}`
                            )
                          }
                        >
                          <FontAwesomeIcon icon={faFile} className="icon" />
                          View CV
                        </Button>
                      </td>
                      <td>
                        <Button
                          color="info"
                          className="action-button"
                          onClick={() => {
                       
                            handleSetOrganizer(user._id);
                          }}
                        >
                          <FontAwesomeIcon icon={faArrowUp} className="icon" />
                          Promote to Organizer
                        </Button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default UserManagement;
