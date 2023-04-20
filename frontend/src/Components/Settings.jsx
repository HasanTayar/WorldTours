// components/Settings.js
import { useState } from 'react';
import { Card, ListGroup, Tab, Row, Col, Form, Button } from 'react-bootstrap';
import { useForm  , Controller } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import '../css/Settings.css';
import GoogleLocation from './GoogleLocation';
import axios from 'axios';

const photoURL = '../userPhoto/';
const authToken = localStorage.getItem('token');

const Settings = ({ user }) => {
  const [activeTab, setActiveTab] = useState('account');
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

const onSubmitAccount = (data) => {
  console.log(data);
  console.log('authToken:', authToken); // Add this line to check authToken

  axios.put('/api/update-profile', data, {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  })
    .then((res) => {
      console.log(res);
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
};

  
  const handleLocationSelect = (place) => {
    console.log('Selected location:', place);
  };

  const onSubmitPassword = (data) => {
    console.log(data);
    // Implement your update password API call here
  };

  const newPassword = watch('newPassword', '');

  return (
    <div className="container p-0">
      <h1 className="h3 mb-3">Settings</h1>
      <Row>
        <Col md={5} xl={4}>
          <Card>
            <Card.Header>
              <h5 className="card-title mb-0">Profile Settings</h5>
            </Card.Header>
            <ListGroup variant="flush" role="tablist">
              <ListGroup.Item
                action
                active={activeTab === 'account'}
                onClick={() => handleTabChange('account')}
                role="tab"
              >
                Account
              </ListGroup.Item>
              <ListGroup.Item
                action
                active={activeTab === 'password'}
                onClick={() => handleTabChange('password')}
                role="tab"
              >
                Password
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col md={7} xl={8}>
          <Tab.Content>
            <Tab.Pane eventKey="account" active={activeTab === 'account'}>
              <Card>
                <Card.Body>
                <Form onSubmit={handleSubmit(onSubmitAccount)}>
                    <Row className="align-items-center">
                      <Col xs={4}>
                        <div className="text-center">
                          <img
                            src={`${photoURL}${user.photo}` || 'default_image.png'}
                            alt="User"
                            width="128"
                            height="128"
                            className="rounded-circle mb-2"
                          />
                          <div>
                            <label htmlFor="inputPhoto" className="btn btn-sm btn-primary">
                              <FontAwesomeIcon icon={faCamera} />
                              &nbsp;Change Photo
                              <input
                                type="file"
                                id="inputPhoto"
                                accept="image/*"
                                className="d-none"
                                {...register('photo')}
                              />
                            </label>
                          </div>
                        </div>
                      </Col>
                      <Col xs={8}>
                        {/* Add your form fields here based on the updated UserSchema */}
                        {/* Common form fields */}
                        <Form.Group controlId="formFirstName">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={user.firstName}
                            {...register('firstName', { required: true })}
                          />
                          {errors.firstName && (
                            <p className="text-danger">First name is required.</p>
                          )}
                        </Form.Group>
                        <Form.Group controlId="formFirstName">
                          <Form.Label>id:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={user._id}
                            {...register('id', { required: true })}
                          />
                          {errors.firstName && (
                            <p className="text-danger">First name is required.</p>
                          )}
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={user.lastName}
                            {...register('lastName', { required: true })}
                          />
                          {errors.lastName && (
                            <p className="text-danger">Last name is required.</p>
                          )}
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            defaultValue={user.email}
                            {...register('email', { required: true })}
                          />
                          {errors.email && (
                            <p className="text-danger">Email is required.</p>
                          )}
                        </Form.Group>
                        <Form.Group controlId="formPhone">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={user.phoneNumber}
                            {...register('phoneNumber', { required: true })}
                          />
                          {errors.phoneNumber && (
                            <p className="text-danger">Phone number is required.</p>
                          )}
                        </Form.Group>

                        {/* Organizer form fields */}
                        {user.isOrganizer && (
                          <>
                            <Form.Group controlId="formBio">
                              <Form.Label>Bio</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={2}
                                defaultValue={user.bio}
                                {...register('bio')}
                              />
                            </Form.Group>
                            <Form.Group controlId="formLocation">
        <Form.Label>Location</Form.Label>
        <Controller
          name="location"
          control={control}
          defaultValue={user.location}
          render={({ field }) => (
            <GoogleLocation
              field={field}
              onLocationSelect={handleLocationSelect}
            />
          )}
        />
      </Form.Group>

                            {/* Other organizer fields can be added here */}
                          </>
                        )}

                        {/* Admin form fields */}
                        {user.isAdmin && (
                          <>
                            {/* Add fields specific to admin users here */}
                          </>
                        )}

                        <Button type="submit" className="mt-3">
                          Save Changes
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Tab.Pane>
            <Tab.Pane eventKey="password" active={activeTab === 'password'}>
              {/* Password settings form */}
              <Card>
                <Card.Body>
                {/* <Form onSubmit={handleSubmit(onSubmitPassword)}>
                    <Form.Group controlId="formCurrentPassword">
                      <Form.Label>Current Password</Form.Label>
                      <Form.Control
                        type="password"
                        {...register('currentPassword', { required: true })}
                      />
                      {errors.currentPassword && (
                        <p className="text-danger">Current password is required.</p>
                      )}
                    </Form.Group>
                    <Form.Group controlId="formNewPassword">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        {...register('newPassword', { required: true, minLength: 8 })}
                      />
                      {errors.newPassword && (
                        <p className="text-danger">
                          New password is required and must be at least 8 characters long.
                        </p>
                      )}
                    </Form.Group>
                    <Form.Group controlId="formConfirmNewPassword">
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control
                        type="password"
                        {...register('confirmNewPassword', {
                          required: true,
                          validate: (value) => value === newPassword,
                        })}
                      />
                      {errors.confirmNewPassword && (
                        <p className="text-danger">
                          Please confirm your new password and ensure it matches the new password.
                        </p>
                      )}
                    </Form.Group>
                    <Button type="submit" className="mt-3">
                      Update Password
                    </Button>
                  </Form> */}
                </Card.Body>
              </Card>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </div>
  );
}
export default Settings;

