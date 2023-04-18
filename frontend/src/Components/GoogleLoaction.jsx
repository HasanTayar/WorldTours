import Autocomplete from 'react-google-autocomplete';

function GoogleLocation({ onLocationSelect, field, className }) {
  const key = 'AIzaSyDhDzbFCa7X0FwHS3aBCFGIpg1coS8UdjE';

  return (
    <Autocomplete
      apiKey={key}
      types={['(regions)']}
      onPlaceSelected={(place) => {
        console.log(place);
        if (onLocationSelect) {
          onLocationSelect(place);
        }
      }}
      renderInput={(props) => (
        <input {...props} {...field} type="text" className={className} />
      )}
    />
  );
}

export default GoogleLocation;
