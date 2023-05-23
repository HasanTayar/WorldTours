const TourHeader = ({ tour }) => (
    <div className="tour-header">
      <img src={tour.photoTimeline} alt="Tour timeline" />
      <h2>{tour.name}</h2>
      <p>{tour.desc}</p>
    </div>
  );
  export default TourHeader;