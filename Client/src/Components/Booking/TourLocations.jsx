const TourLocations = ({ tour }) => {
  console.log(tour);

  return (
    <>
      <div className="tour-locations">
        {tour && tour.locations && tour.locations.map((location, index) => {
          console.log(location);
          return (
            <div key={index} className="location">
              <li>{location.locationName}</li>
            </div>
          );
        })}
      </div>
      <hr/>
    </>
  );
};

export default TourLocations;
