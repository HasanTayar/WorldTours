import OrgainzerPublicView from "./PublicViewComponents/OrgainzerPublicView";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import SocialMediaIcons from "./SocialMediaIcons";
const PublicView = ({ user }) => {
  return (
    <Container fluid className="py-4">
      <Row>
        <Col md={4} className="d-flex flex-column align-items-center">
          <Image
            src={
              user.photo ? `${user.photo}` : "https://via.placeholder.com/150"
            }
            roundedCircle
            width="200"
            height="200"
          />
          <div className="mt-3">{<SocialMediaIcons user={user}/>}</div>
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
              {user.isOrganizer && <OrgainzerPublicView user={user} />}
            </>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};
export default PublicView;
