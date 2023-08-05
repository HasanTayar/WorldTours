import { useState } from "react";
import Payment from "../payment/Payment";

import "./Profile.css";
import AccountSettings from "../../Components/Profile/AccountSettings";
import PublicView from "../../Components/Profile/PublicView";
import PasswordSettings from "../../Components/Profile/PasswordSettings";
import SideBar from "../../Components/Profile/SideBar";
import OrganizerRequest from "../../Components/Profile/OrganizerRequest";
import { updateUserProfile } from "../../Services/userService";
const Profile = ({ user }) => {
  const [activeSetting, setActiveSetting] = useState("publicView");
  const {
    email = user ? user.email : "",
    firstName = user ? user.firstName : "",
    lastName = user ? user.lastName : "",
    phoneNumber = user ? user.phoneNumber : "",
    bio = user ? user.bio : "",
    languages = user ? user.languages : [],
    socialMediaLinks = user ? user.socialMediaLinks : [],
    certifications = user ? user.certifications : [],
    specialties = user ? user.specialties : [],
  } = user || {};

  const [newEmail, setNewEmail] = useState(email);
  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);
  const [newBio, setNewBio] = useState(bio);
  const [newLanguages, setNewLanguages] = useState(languages);
  const [newCertifications, setNewCertifications] = useState(certifications);
  const [newSpecialties, setNewSpecialties] = useState(specialties);
  const [userPhoto, setUserPhoto] = useState(user.photo ? user.photo : null);
  const [previewPhoto, setPreviewPhoto] = useState(
    "https://via.placeholder.com/150"
  );
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


const handleSelect = (eventKey) => {
    setActiveSetting(eventKey);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("email", newEmail ? newEmail : email);
    formData.append("firstName", newFirstName ? newFirstName : firstName);
    formData.append("lastName", newLastName ? newLastName : lastName);
    formData.append("phoneNumber", newPhoneNumber ? newPhoneNumber : phoneNumber);
    formData.append("bio", newBio ? newBio : bio);
    formData.append("location", newLocation ? newLocation : location);
    formData.append("languages", newLanguages ? newLanguages : languages);
    formData.append("certifications", newCertifications ? newCertifications : certifications);
    formData.append("specialties", newSpecialties ? newSpecialties : specialties);
    
    // Attach the photo to the form data only if one has been selected.
    if (userPhoto) {
      formData.append("photo", userPhoto);
    }
  
    updateUserProfile(formData);
  };
  

  const renderSettingContent = () => {
    switch (activeSetting) {
      case "accountSettings":
        return (
          <AccountSettings
            user={user}
            handleSubmit={handleSubmit}
            previewPhoto={previewPhoto}
            setNewEmail={setNewEmail}
            setNewBio={setNewBio}
            setNewPhoneNumber={setNewPhoneNumber}
            setNewCertifications={setNewCertifications}
            setNewLanguages={setNewLanguages}
            setNewSpecialties={setNewSpecialties}
            handlePhotoChange={handlePhotoChange}
            setNewFirstName={setNewFirstName}
            setNewLastName={setNewLastName}
          />
        );

      case "passwordSettings":
        return <PasswordSettings user={user}/>;
      case "PaymentMethods":
        return <Payment id={user._id} />;
        
        case "OrganizerRequest":
          return user.isOrganizer ? 
          <p style={{ color: 'red', fontSize: '18px' }}>You are already an organizer. There's no need to make a request.</p> 
          : <OrganizerRequest user={user}/>;
      default:
        return (
          <PublicView
            user={user}
          />
        );
    }
  };

  return <SideBar renderSettingContent={renderSettingContent} handleSelect={handleSelect} user={user}/>;
};

export default Profile;
