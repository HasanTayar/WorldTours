import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import { Form } from 'react-bootstrap';

function GoogleLocation({ onLocationSelect, field, className }) {
  const key = 'AIzaSyDhDzbFCa7X0FwHS3aBCFGIpg1coS8UdjE';

  const handlePlaceSelect = (place) => {
    console.log(place);
    const addressComponents = place.address_components;
    const addressObj = {};
    for (let i = 0; i < addressComponents.length; i++) {
      const component = addressComponents[i];
      const componentType = component.types[0];
      addressObj[componentType] = component.long_name;
    }
    const city = addressObj.locality;
    const country = addressObj.country;
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    if (onLocationSelect) {
      onLocationSelect({ city, country, lat, lng });
    }
  };

  return (
    <Autocomplete
      apiKey={key}
      types={['(regions)']}
      onPlaceSelected={handlePlaceSelect}
      renderInput={(props) => (
        <Form.Control {...props} {...field} type="text" className={className} />
      )}
    />
  );
}

export default GoogleLocation;
