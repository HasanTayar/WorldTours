import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { uploadCV } from "../../Services/userService";

const OrganizerRequest = ({ user }) => {
  const [cv, setCV] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleCVUpload = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);
  
      const formData = new FormData();
      formData.append("cv", cv);
      
      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]); // debug line to print form data entries
      }
      
      await uploadCV(user._id, formData);
  
      // CV uploaded successfully
      setSuccessMessage("CV uploaded successfully for organizer request");
    } catch (error) {
      console.error("Error uploading CV for organizer request:", error);
      setErrorMessage("An error occurred while uploading the CV");
    } finally {
      setLoading(false);
    }
  };
  
  

  console.log(cv);
  const handleCVChange = (event) => {
    setCV(event.target.files[0]);
  };

  return (
    <div className="organizer-request">
      <h1>Organizer Request</h1>
      <Form encType="multipart/form-data">
        <FormGroup>
          <Label for="cv">Upload CV</Label>
          <Input type="file" name="cv" id="cv" onChange={handleCVChange} />
        </FormGroup>
        {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
        {successMessage && <Alert color="success">{successMessage}</Alert>}
        <Button
          color="primary"
          onClick={handleCVUpload}
          disabled={isLoading || !cv}
        >
          {isLoading ? "Uploading..." : "Submit Request"}
        </Button>
      </Form>
    </div>
  );
};

export default OrganizerRequest;
