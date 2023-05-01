import GooglePlaceAutocomplete from "../../Services/Google/GooglePlaceAutocomplete";
import { FormGroup , FormLabel , Button , FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const Days = ({
    index,
    handleDayInputChange,
    handleDayPhotoChange,
    handleLocationSelect,
    removeDay,
  }) => {
    return (
      <div>
        <FormGroup>
          <FormLabel>{`Day ${index + 1} Name`}</FormLabel>
          <FormControl
            type="text"
            name="dayName"
            onChange={(e) => handleDayInputChange(e, index)}
          />
        </FormGroup>
  
        <GooglePlaceAutocomplete
          controlId={`location-day-${index + 1}`}
          label={`Day ${index + 1} Location`}
          onLocationSelect={(location) =>
            handleLocationSelect(location, index + 1)
          }
        />
        <FormGroup>
          <FormLabel>{`Day ${index + 1} Description`}</FormLabel>
          <FormControl
            as="textarea"
            name="desc"
            onChange={(e) => handleDayInputChange(e, index)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor={`dayPhoto-${index + 1}`}>{`Day ${
            index + 1
          } Photo`}</FormLabel>
  
          <FormGroup>
            <FormControl
              type="file"
              id={`dayPhoto-${index + 1}`}
              name="dayPhoto"
              onChange={(e) => handleDayPhotoChange(e, index)}
            />
          </FormGroup>
        </FormGroup>
  
        <Button
          className="mb-3"
          variant="danger"
          type="button"
          onClick={removeDay}
        >
          <FontAwesomeIcon icon={faTrash} />
          Remove Day
        </Button>
      </div>
    );
  };
  export default Days;