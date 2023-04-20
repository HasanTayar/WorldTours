import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Image, Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid, faStar as faStarRegular, faPencilAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import GooglePlaceAutocomplete from './GooglePlaceAutocomplete';
import axios from 'axios';
const photoURL = "../userPhoto/";
const Profile = ({ user }) => {
    const [activeSetting, setActiveSetting] = useState('publicView');
    const {
      email = user ? user.email : '',
      firstName = user ? user.firstName : '',
      lastName = user ? user.lastName : '',
      phoneNumber = user ? user.phoneNumber : '',
      bio = user ? user.bio : '',
      location = user ? user.location : '',
      languages = user ? user.languages : [],
      pastTourLocations = user ? user.pastTourLocations : [],
      socialMediaLinks = user ? user.socialMediaLinks : [],
      certifications =  user ? user.certifications  : [],
      specialties = user ? user.specialties :[],
      contactInfo = user ? user.contactInfo : [],
      createdAt,
    } = user || {};

    const [newEmail, setNewEmail] = useState(email);
    const [newFirstName, setNewFirstName] = useState(firstName);
    const [newLastName, setNewLastName] = useState(lastName);
    const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);
    const [newBio, setNewBio] = useState(bio);
    const [newLocation, setNewLocation] = useState(location);
    const [newLanguages, setNewLanguages] = useState(languages);
    const [newPastTourLocations, setNewPastTourLocations] = useState(pastTourLocations);
    const [newSocialMediaLinks, setNewSocialMediaLinks] = useState(socialMediaLinks);
    const [newCertifications, setNewCertifications] = useState(certifications);
    const [newSpecialties, setNewSpecialties] = useState(specialties);
    const [newContactInfo, setNewContactInfo] = useState(contactInfo);
    const [userPhoto, setUserPhoto] = useState(user.photo ? user.photo : null);
    const [previewPhoto, setPreviewPhoto] = useState('https://via.placeholder.com/150');
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUserPhoto(file);
            setPreviewPhoto(URL.createObjectURL(file));
        } else {
            setUserPhoto(null);
            setPreviewPhoto(null);
        }
    };
    async function updateUserProfile(updatedData) {
        console.table(updatedData);
        try {
            const response = await axios.put('/api/update-profile', updatedData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.status === 200) {
                console.log('Profile updated successfully');
                // Update the UI or redirect the user as needed
            } else {
                console.log('Error updating profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    }
      
    const handleProfilePictureChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setProfilePicture(URL.createObjectURL(event.target.files[0]));
        }
    };
    const renderSocialMediaIcons = () => {
        const socialMedia = [
            { name: 'facebook', icon: faFacebook, link: user.socialMediaLinks?.facebook },
            { name: 'instagram', icon: faInstagram, link: user.socialMediaLinks?.instagram },
            { name: 'twitter', icon: faTwitter, link: user.socialMediaLinks?.twitter },
        ];
    
        return socialMedia.map((media) => (
            media.link && (
                <a href={media.link} target="_blank" rel="noopener noreferrer" className="mx-2">
                    <FontAwesomeIcon icon={media.icon} size="2x" />
                </a>
            )
        ));
    };
    const renderLocationField = () => {
        if (user.location) {
          return (
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" defaultValue={user.location} readOnly />
            </Form.Group>
          );
        } else {
          return (
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <GooglePlaceAutocomplete
                onLocationSelect={(place) => handleLocationSelect(place)}
                field={{ value: newLocation }}
                className="form-control"
              />
            </Form.Group>
          );
        }
      };


    const handleSelect = (eventKey) => {
        setActiveSetting(eventKey);
    };


    const handleLocationSelect = (place) => {
        setNewLocation(place.formatted_address);
    };




    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating - fullStars >= 0.5;
        const emptyStars = 4 - fullStars; // Adjust the number 4 depending on the maximum rating

        return (
            <>
                {Array.from({ length: fullStars }).map((_, index) => (
                    <FontAwesomeIcon key={`full-${index}`} icon={faStarSolid} className="mx-1" />
                ))}
                {halfStar && <FontAwesomeIcon icon={faStarRegular} className="mx-1" />}
                {Array.from({ length: emptyStars }).map((_, index) => (
                    <FontAwesomeIcon key={`empty-${index}`} icon={faStarOutline} className="mx-1" />
                ))}
            </>
        );
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUser = {
            email: newEmail ? newEmail : email,
            firstName: newFirstName ? newFirstName : firstName,
            lastName: newLastName ? newLastName : lastName,
            phoneNumber: newPhoneNumber ? newPhoneNumber : phoneNumber,
            bio: newBio ? newBio : bio,
            location: newLocation ? newLocation : location,
            languages: newLanguages ? newLanguages : languages,
            pastTourLocations: newPastTourLocations ? newPastTourLocations : pastTourLocations,
            socialMediaLinks: newSocialMediaLinks ? newSocialMediaLinks : socialMediaLinks,
            certifications: newCertifications ? newCertifications : certifications,
            specialties: newSpecialties ? newSpecialties : specialties,
            contactInfo: newContactInfo ? newContactInfo : contactInfo,
            createdAt: createdAt,
          };
          console.log('updatedUser', updatedUser);
            updateUserProfile(updatedUser);
          };
      
        
      
      

    const renderSettingContent = () => {
        switch (activeSetting) {
            case 'accountSettings':
                return (
                    <>
                        <Form onSubmit={handleSubmit}>
                            <div className='position-relative'>
                                <img 
                                src={`${previewPhoto}`}
                                alt="User"
                                 className="img-thumbnail rounded-circle"
                                style={{ maxWidth: "150px", maxHeight: "150px", objectFit: "cover" }}
                                />
                                <div className="position-absolute top-0 end-0">
                                            <label htmlFor="user-photo-input" className="btn btn-secondary btn-sm">
                                                Change Photo
                                            </label>
                                            <input
                                                id="user-photo-input"
                                                type="file"
                                                className="d-none"
                                                name="userPhoto"
                                                onChange={handlePhotoChange}
                                                accept="image/*"
                                            />
                                        </div>
                                    </div>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>
                                    Email address
                                    <FontAwesomeIcon
                                        icon={faPencilAlt}
                                        className="mx-2"
                                    />
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    defaultValue={user.email}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Label>
                                Full name
                                <FontAwesomeIcon
                                    icon={faPencilAlt}
                                    className="mx-2"
                                   
                                />
                            </Form.Label>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <div className="d-flex">
                                    <Form.Label className="me-2"></Form.Label>
                                    <Form.Control
                                        className="me-2"
                                        type="text"
                                        defaultValue={user.firstName}
                                        onChange={(e) => setNewFirstName(e.target.value)}
                                    />
                                    <Form.Label className="me-2"></Form.Label>
                                    <Form.Control
                                        className="ms-2"
                                        type="text"
                                        defaultValue={user.lastName}
                                        onChange={(e) => setNewLastName(e.target.value)}
                                    />
                                </div>
                            </Form.Group>
                            {user.isAdmin || user.isOrganizer ? (
                                <div>
                                    <Form.Group className="mb-3" controlId="formBasicBio">
                                        <Form.Label>
                                            Bio
                                            <FontAwesomeIcon
                                                icon={faPencilAlt}
                                                className="mx-2"
                                              
                                            />
                                        </Form.Label>
                                        <Col>
                                            <Form.Control
                                                as="textarea"
                                                aria-label="With textarea"
                                                defaultValue={user.bio}
                                                onChange={(e) => setNewBio(e.target.value)}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicSocialMedia">
                                        <Form.Label>Social Media</Form.Label>
                                        <div className="d-flex align-items-center">
                                            <FontAwesomeIcon
                                                icon={faFacebook}
                                                style={{ color: '#1877F2', fontSize: '1.5rem' }}
                                            />
                                            <Form.Control
                                                className="ms-2"
                                                type="text"
                                                placeholder="Facebook URL"
                                                name="facebook"
                                                defaultValue={
                                                    user.socialMediaLinks
                                                        ? user.socialMediaLinks.facebook
                                                        : ''
                                                }
                                              onChange={(e) => setNewSocialMediaLinks({ ...newSocialMediaLinks, facebook: e.target.value })}
                                            />
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <FontAwesomeIcon
                                                icon={faInstagram}
                                                style={{ color: '#E1306C', fontSize: '1.5rem' }}
                                            />
                                            <Form.Control
                                                className="ms-2"
                                                type="text"
                                                placeholder="Instagram URL"
                                                name="instagram"
                                                defaultValue={
                                                    user.socialMediaLinks
                                                        ? user.socialMediaLinks.instagram
                                                        : ''
                                                }
                                                onChange={(e) => setNewSocialMediaLinks({ ...newSocialMediaLinks, instagram: e.target.value })}
                                            />
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <FontAwesomeIcon
                                                icon={faTwitter}
                                                style={{ color: '#1DA1F2', fontSize: '1.5rem' }}
                                            />
                                            <Form.Control
                                                className="ms-2"
                                                type="text"
                                                placeholder="Twitter URL"
                                                name="twitter"
                                                defaultValue={
                                                    user.socialMediaLinks
                                                        ? user.socialMediaLinks.twitter
                                                        : ''
                                                }
                                                onChange={(e) => setNewSocialMediaLinks({ ...newSocialMediaLinks, twitter: e.target.value })}
                                            />
                                        </div>
                                    </Form.Group>
                                    {user.isOrganizer && (
                                        <>
                                            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                                                <Form.Label>
                                                    Phone Number
                                                    <FontAwesomeIcon
                                                        icon={faPencilAlt}
                                                        className="mx-2"
                                                        
                                                    />
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    defaultValue={user.phoneNumber}
                                                    onChange={(e) => setNewPhoneNumber(e.target.value)}
                                                />
                                            </Form.Group>

                                           
                                            {renderLocationField()}
                                       



                                            <Form.Group controlId="languages">
                                                <Form.Label>Languages</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter your languages"
                                                    defaultValue={user.languages}
                                                    onChange={(e) => setNewLanguages(e.target.value.split(', '))}
                                                    
                                                />
                                                <Form.Text className="text-muted">
                                                    Separate multiple languages with commas (e.g. "English, Spanish, French")
                                                </Form.Text>
                                            </Form.Group>

                                            <Form.Group controlId="certifications">
                                                <Form.Label>Certifications</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter your certifications"
                                                    defaultValue={user.certifications.join(',')}
                                                    onChange={(event) =>
                                                        setNewCertifications(event.target.value.split(','))
                                                    }
                                                />
                                                <Form.Text className="text-muted">
                                                    Separate multiple certifications with commas (e.g. "First Aid, CPR, Wilderness Guide")
                                                </Form.Text>
                                            </Form.Group>
                                            <Form.Group  controlId="specialties">
                                            <Form.Label>Specialties</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter your Specialties"
                                                    defaultValue={user.specialties.join(',')}
                                                    onChange={(event) =>
                                                        setNewSpecialties(event.target.value.split(','))
                                                    }
                                                />
                                                <Form.Text className="text-muted">
                                                    Separate multiple Specialties with commas (e.g. "Ability to Listen , Attention to Details .. ")
                                                </Form.Text>
                                            </Form.Group>
                                            <Form.Group  controlId="contatInfo">
                                            <Form.Label>Contact info</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter your Email to Contact"
                                                    defaultValue={user.contactInfo.contactEmail}
                                                    onChange={(e) => setNewContactInfo({ ...contactInfo, contactEmail : e.target.value })}
                                                />
                                                  <Form.Control
                                                    type="text"
                                                    placeholder="Enter your phone to Contact"
                                                    defaultValue={user.contactInfo.phone}
                                                    onChange={(e) => setNewContactInfo({ ...contactInfo, phone : e.target.value })}
                                                />
                                            </Form.Group>
                                        </>
                                    )}
                                </div>
                            ) : null}
                            <Button
                                variant="primary"
                                type="submit"
                            >
                                Save Changes
                            </Button>
                        </Form>
                    </>
                );

            case 'passwordSettings':
                return (
                    <Form>
                       <Form.Group controlId="Password" >
                        <Form.Label>
                        Current Password
                        </Form.Label>
                        <Form.Control type='password'></Form.Control>
                       </Form.Group>
                       <Form.Group controlId="Password1" >
                        <Form.Label>
                        Enter a new Password
                        </Form.Label>
                        <Form.Control type='password'></Form.Control>
                       </Form.Group>
                       <Form.Group controlId="Password2" >
                        <Form.Label>
                        Confriom Password
                        </Form.Label>
                        <Form.Control type='password'></Form.Control>
                       </Form.Group>
                       <Form.Group><Button type='sumbit' variant="primary"> Change Password</Button></Form.Group>
                       
                    </Form>
                );
            default:
                return (
                    <Container fluid className="py-4">
                    <Row>
                        <Col md={4} className="d-flex flex-column align-items-center">
                            <Image
                                src={user.photo ? `${photoURL}${user.photo}` : 'https://via.placeholder.com/150'}
                                roundedCircle
                                width="200"
                                height="200"
                                onChange={handleProfilePictureChange}
                            />
                            <div className="mt-3">
                                {renderSocialMediaIcons()}
                            </div>
                        </Col>
                        <Col md={8}>
                            <h3>
                                {user.firstName} {user.lastName}
                            </h3>
                            {user.isAdmin || user.isOrganizer ? (
                                <>
                                    <Card className="mb-3">
                                        <Card.Body>
                                            <Card.Title>Bio</Card.Title>
                                            <Card.Text>{user.bio}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                    {user.isOrganizer && (
                                        <>
                                            <Card className="mb-3">
                                                <Card.Body>
                                                    <Card.Title>Rating</Card.Title>
                                                    <Card.Text>{renderStars(user.rating)}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                            <Card className="mb-3">
                                                <Card.Body>
                                                    <Card.Title>Location</Card.Title>
                                                    <Card.Text>{user.location}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                            <Card className="mb-3">
                                                <Card.Body>
                                                    <Card.Title>Languages</Card.Title>
                                                    <Card.Text>{user.languages.join(', ')}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                            <Card className="mb-3">
                                                <Card.Body>
                                                    <Card.Title>specialties</Card.Title>
                                                    <Card.Text>{user.specialties.join(', ')}</Card.Text>
                                                </Card.Body>
                        
                                            </Card>
                                            <Card className='mb-3'>
                                                <Card.Body>
                                                    <Card.Title>certifications</Card.Title>
                                                    <Card.Text>{user.certifications.join(', ')}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                            <Card className="mb-3">
                                                <Card.Body>
                                                    <Card.Title>contact</Card.Title>
                                                    <Card.Text>{user.contactInfo.contactEmail}</Card.Text>
                                                    <Card.Text>{user.contactInfo.phone}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                            <Card className="mb-3">
                                                <Card.Body>
                                                    <Card.Title>Tours Organized</Card.Title>
                                                    <Card.Text>{user.toursOrganized}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                            {/* Add other cards for the remaining information */}
                                        </>
                                    )}
                                </>
                            ) : null}
                        </Col>
                    </Row>
                </Container>
                );
        }
    };

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <Navbar bg="light" expand="lg">
                        <Nav className="flex-column" onSelect={handleSelect}>
                            <Nav.Link eventKey="publicView">Public View</Nav.Link>
                            <Nav.Link eventKey="accountSettings">Account Settings</Nav.Link>
                            <Nav.Link eventKey="passwordSettings">Password Settings</Nav.Link>
                        </Nav>
                    </Navbar>
                </Col>
                <Col md={9}>
                    <Card>
                        <Card.Body>{renderSettingContent()}</Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
