import { FormGroup, FormControl, FormLabel,InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const Tags = ({ tags, setTags, formData, setFormData }) => {
  const addTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
      setFormData({
        ...formData,
        tags: tags,
      });
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <FormGroup>
      <FormLabel>Tags</FormLabel>
      <InputGroup>
        <FormControl
          type="text"
          name="tagInput"
          placeholder="Enter a tag"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addTag(e.target.value.trim());
              e.target.value = "";
            }
          }}
        />
        <InputGroup>
          <Button
            variant="outline-secondary"
            onClick={(e) => {
              const input = e.target.previousElementSibling;
              addTag(input.value.trim());
              input.value = "";
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Tag
          </Button>
        </InputGroup>
      </InputGroup>
      <div className="mt-2">
        {tags.map((tag) => (
          <span key={tag} className="badge badge-primary mr-2">
            {tag}{" "}
            <FontAwesomeIcon
              icon={faMinus}
              onClick={() => removeTag(tag)}
              style={{ cursor: "pointer" }}
            />
          </span>
        ))}
      </div>
    </FormGroup>
  );
};

export default Tags;
