import { FormGroup, FormControl, FormLabel } from "react-bootstrap";

const TourForm = ({ formData, handleInputChange, setTimelinePhoto }) => {
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setTimelinePhoto(file);
  };

  return (
    <>
      <FormGroup>
        <FormLabel>Tour Name</FormLabel>
        <FormControl
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Tour Price</FormLabel>
        <FormControl
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Tour Description</FormLabel>
        <FormControl
          as="textarea"
          name="desc"
          value={formData.desc}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="timelinePhoto">Timeline Photo</FormLabel>
        <FormControl
          type="file"
          id="timelinePhoto"
          name="timelinePhoto"
          onChange={handlePhotoChange}
        />
      </FormGroup>
    </>
  );
};

export default TourForm;
