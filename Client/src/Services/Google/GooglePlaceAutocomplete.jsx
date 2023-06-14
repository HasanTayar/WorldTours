import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from '@react-google-maps/api';
import { FormGroup, FormLabel, FormControl } from 'react-bootstrap';

const GooglePlaceAutocomplete = ({ onLocationSelect, field, className, label, controlId }) => {
  const autocompleteRef = useRef(null);

  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const handlePlaceSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      
      console.log('autocomplete:', place);
      onLocationSelect(place);
    }
  };

  return (
    <FormGroup controlId={controlId}>
      {label && <FormLabel>{label}</FormLabel>}
      <Autocomplete onLoad={onLoad} onPlaceChanged={handlePlaceSelect}>
        <FormControl as="input" type="text" className={className} {...field} />
      </Autocomplete>
    </FormGroup>
  );
};

GooglePlaceAutocomplete.propTypes = {
  onLocationSelect: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  controlId: PropTypes.string.isRequired
};

export default GooglePlaceAutocomplete;
