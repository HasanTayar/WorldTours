import React from "react";
import Select from "react-select";

const TagSearch = ({ tags, onChange }) => {
  // convert tags to format compatible with react-select
  const options = tags.map((tag) => ({ value: tag, label: tag }));

  const handleChange = (selected) => {
    const selectedTags = selected.map((item) => item.value);
    onChange({ tags: selectedTags });
  }
    const TagSearch = ({ tags, onChange }) => {
      const handleChange = (selected) => {
        const selectedTags = selected.map((item) => item.value);
        onChange({ tags: selectedTags });
      };
    
      return (
        <Form.Group controlId="tourTags">
          <Form.Label>Tour Tags</Form.Label>
          <Select
            isMulti
            name="tags"
            options={tags.map((tag) => ({ value: tag, label: tag }))}
            onChange={handleChange}
          />
        </Form.Group>
      );
    };
  }
    
    export default TagSearch;
    