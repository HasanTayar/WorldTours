import {Navbar , Nav , Col , Row , Container , Card} from 'react-bootstrap';  

const SideBar = ({renderSettingContent , handleSelect}) =>{
    return (
    <Container>
    <Row>
        <Col md={3}>
            <Navbar bg="light" expand="lg">
                <Nav className="flex-column" onSelect={handleSelect}>
                    <Nav.Link eventKey="publicView">Public View</Nav.Link>
                    <Nav.Link eventKey="accountSettings">Account Settings</Nav.Link>
                    <Nav.Link eventKey="passwordSettings">Password Settings</Nav.Link>
                    <Nav.Link eventKey="PaymentMethods">Payment Settings</Nav.Link>
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
    )
}
export default SideBar;