import React, { useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { FormGroup, FormLabel, FormControl } from 'react-bootstrap';

const GooglePlaceAutocomplete = ({ onLocationSelect, field, className, label, controlId }) => {
  const autocompleteRef = useRef(null);

  const onLoad = (autocomplete) => {
    console.log('autocomplete:', autocomplete);
    autocompleteRef.current = autocomplete;
  };

  const handlePlaceSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      onLocationSelect(place);
    }
  };

  return (
    <FormGroup controlId={controlId}>
      {label && <FormLabel>{label}</FormLabel>}
      <Autocomplete onLoad={onLoad} onPlaceChanged={handlePlaceSelect}>
        <FormControl as="input" type="text" {...field} className={className} />
      </Autocomplete>
    </FormGroup>
  );
};

export default GooglePlaceAutocomplete;
