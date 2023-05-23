import { useState } from "react";
import Payment from "../payment/Payment";
import axios from "axios";
import "./Profile.css";
import AccountSettings from "../../Components/Profile/AccountSettings";
import PublicView from "../../Components/Profile/PublicView";
import PasswordSettings from "../../Components/Profile/PasswordSettings";
import SideBar from "../../Components/Profile/SideBar";
import { updateUserProfile } from "../../Services/userService";
const Profile = ({ user }) => {
  const [activeSetting, setActiveSetting] = useState("publicView");
  const {
    email = user ? user.email : "",
    firstName = user ? user.firstName : "",
    lastName = user ? user.lastName : "",
    phoneNumber = user ? user.phoneNumber : "",
    bio = user ? user.bio : "",
    location = user ? user.location : "",
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
  const [newLocation, setNewLocation] = useState(location);
  const [newLanguages, setNewLanguages] = useState(languages);
  const [newSocialMediaLinks, setNewSocialMediaLinks] =
    useState(socialMediaLinks);
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
    const updatedUser = {
      email: newEmail ? newEmail : email,
      firstName: newFirstName ? newFirstName : firstName,
      lastName: newLastName ? newLastName : lastName,
      phoneNumber: newPhoneNumber ? newPhoneNumber : phoneNumber,
      bio: newBio ? newBio : bio,
      location: newLocation ? newLocation : location,
      languages: newLanguages ? newLanguages : languages,
      certifications: newCertifications ? newCertifications : certifications,
      specialties: newSpecialties ? newSpecialties : specialties,
    };
    updateUserProfile(updatedUser);
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
            setNewSocialMediaLinks={setNewSocialMediaLinks}
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
        return <PasswordSettings />;
      case "PaymentMethods":
        return <Payment id={user._id} />;
      default:
        return (
          <PublicView
            user={user}
          />
        );
    }
  };

  return <SideBar renderSettingContent={renderSettingContent} handleSelect={handleSelect}/>;
};

export default Profile;
