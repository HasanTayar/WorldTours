import Email from "./AccountSettingsComponents/Email";
import Bio from "./AccountSettingsComponents/Bio";
import Name from "./AccountSettingsComponents/Name";
import Photo from "./AccountSettingsComponents/Photo";
import SocialMedia from "./AccountSettingsComponents/SocialMedia";
import OrganizerSettings from "./AccountSettingsComponents/OrganizerSettings";
import { Button, Form } from "react-bootstrap";

const newLocation = "";
const AccountSettings = ({
  user,
  handleSubmit,
  previewPhoto,
  setNewEmail,
  setNewBio,
  setNewPhoneNumber,
  setNewCertifications,
  setNewLanguages,
  setNewSpecialties,
  handlePhotoChange,
  setNewFirstName,
  setNewLastName,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Photo
        previewPhoto={previewPhoto}
        handlePhotoChange={handlePhotoChange}
      />
      <Email user={user} setNewEmail={setNewEmail} />
      <Name
        user={user}
        setNewFirstName={setNewFirstName}
        setNewLastName={setNewLastName}
      />
      {user.isAdmin || user.isOrganizer ? (
        <div>
          <Bio user={user} setNewBio={setNewBio} />
          {user.isOrganizer && (
            <OrganizerSettings
              user={user}
              setNewPhoneNumber={setNewPhoneNumber}
              setNewLanguages={setNewLanguages}
              setNewCertifications={setNewCertifications}
              setNewSpecialties={setNewSpecialties}
            />
          )}
        </div>
      ) : null}
      <Button variant="primary" type="submit">
        Save Changes
      </Button>
    </Form>
  );
};
export default AccountSettings;
