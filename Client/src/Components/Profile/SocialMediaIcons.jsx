import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const SocialMediaIcons = ({ user }) => {
  const socialMedia = [
    {
      name: "facebook",
      icon: faFacebook,
      link: user.socialMediaLinks?.facebook,
    },
    {
      name: "instagram",
      icon: faInstagram,
      link: user.socialMediaLinks?.instagram,
    },
    {
      name: "twitter",
      icon: faTwitter,
      link: user.socialMediaLinks?.twitter,
    },
  ];

  return (
    <>
      {socialMedia.map(
        (media) =>
          media.link && (
            <a
              href={media.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2"
            >
              <FontAwesomeIcon icon={media.icon} size="2x" />
            </a>
          )
      )}
    </>
  );
};

export default SocialMediaIcons;
