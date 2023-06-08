import { Table, Button, Input, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEnvelope, faArrowUp, faFile } from '@fortawesome/free-solid-svg-icons';
import { useState , useEffect } from 'react';
import classnames from 'classnames';
import './UserManagement.css';
import { fetchAllUsers } from '../../Services/userService';

function UserManagement({user}) {
  const [users , setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState('1');
  const currentUserID = user._id; 

  const toggleTab = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  useEffect(() => {
    fetchAllUsers().then(users => setUsers(users));
  }, []);

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
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggleTab('1'); }}
          >
            All Users
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggleTab('2'); }}
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
              {users && users.filter(user => user._id !== currentUserID).filter(user => user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || user.lastName.toLowerCase().includes(searchTerm.toLowerCase())).map((user, index) => (
                <tr key={index}>
                  <td>{user.firstName + " " + user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? 'Admin' : user.isOrganizer ? 'Organizer' : 'Normal User'}</td>
                  <td>
                    <Button color="primary" className="action-button">
                      <FontAwesomeIcon icon={faEnvelope} className="icon" />
                      Contact
                    </Button>
                    {!user.isOrganizer && user.isRequest &&
                      <Button color="info" className="action-button">
                        <FontAwesomeIcon icon={faArrowUp} className="icon" />
                        Promote to Organizer
                      </Button>
                    }
                    {!user.isAdmin &&
                      <Button color="warning" className="action-button">
                        <FontAwesomeIcon icon={faArrowUp} className="icon" />
                        Promote to Admin
                      </Button>
                    }
                    <Button color="danger" className="action-button">
                      <FontAwesomeIcon icon={faTrashAlt} className="icon" />
                      Delete
                    </Button>
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
              {users && users.filter(user => user._id !== currentUserID && user.isRequest).filter(user => user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || user.lastName.toLowerCase().includes(searchTerm.toLowerCase())).map((user, index) => (
                <tr key={index}>
                  <td>{user.firstName + " " + user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button color="info" className="action-button">
                      <FontAwesomeIcon icon={faFile} className="icon" />
                      View CV
                    </Button>
                  </td>
                  <td>
                    <Button color="info" className="action-button">
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
