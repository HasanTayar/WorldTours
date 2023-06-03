import { useState, useEffect } from "react";
import { Form, Dropdown } from "react-bootstrap";

const TagSearch = ({ onChange, tags }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    setAllTags(tags);
  }, [tags]);

  const handleSelectTag = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      onChange({ tags: [...selectedTags, tag] });
    }
  };

  return (
    <Form.Group controlId="tourTags">
      <Form.Label>Tour Tags</Form.Label>
      <Dropdown onSelect={handleSelectTag}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select Tags
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {allTags.map(tag => 
            <Dropdown.Item eventKey={tag} key={tag}>{tag}</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </Form.Group>
  );
};

export default TagSearch;
