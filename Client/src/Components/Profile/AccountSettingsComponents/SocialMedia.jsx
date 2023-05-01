import {Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
const SocialMedia = ({ user, setNewSocialMediaLinks }) => {
    return (
      <Form.Group className="mb-3" controlId="formBasicSocialMedia">
        <Form.Label>Social Media</Form.Label>
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={faFacebook}
            style={{ color: "#1877F2", fontSize: "1.5rem" }}
          />
          <Form.Control
            className="ms-2"
            type="text"
            placeholder="Facebook URL"
            name="facebook"
            defaultValue={
              user.socialMediaLinks ? user.socialMediaLinks.facebook : ""
            }
            onChange={(e) =>
              setNewSocialMediaLinks({
                ...newSocialMediaLinks,
                facebook: e.target.value,
              })
            }
          />
        </div>
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={faInstagram}
            style={{ color: "#E1306C", fontSize: "1.5rem" }}
          />
          <Form.Control
            className="ms-2"
            type="text"
            placeholder="Instagram URL"
            name="instagram"
            defaultValue={
              user.socialMediaLinks ? user.socialMediaLinks.instagram : ""
            }
            onChange={(e) =>
              setNewSocialMediaLinks({
                ...newSocialMediaLinks,
                instagram: e.target.value,
              })
            }
          />
        </div>
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={faTwitter}
            style={{ color: "#1DA1F2", fontSize: "1.5rem" }}
          />
          <Form.Control
            className="ms-2"
            type="text"
            placeholder="Twitter URL"
            name="twitter"
            defaultValue={
              user.socialMediaLinks ? user.socialMediaLinks.twitter : ""
            }
            onChange={(e) =>
              setNewSocialMediaLinks({
                ...newSocialMediaLinks,
                twitter: e.target.value,
              })
            }
          />
        </div>
      </Form.Group>
    );
  };
  export default SocialMedia;