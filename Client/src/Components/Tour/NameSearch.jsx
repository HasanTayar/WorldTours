import { useState } from "react";
import { Form } from "react-bootstrap";

const NameSearch = ({ onChange }) => {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
    onChange({ name: event.target.value });
  };

  return (
    <Form.Group controlId="tourName">
      <Form.Label>Tour Name</Form.Label>
      <Form.Control
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
      />
    </Form.Group>
  );
};

export default NameSearch;
