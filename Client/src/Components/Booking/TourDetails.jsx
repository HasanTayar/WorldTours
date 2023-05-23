const TourDetails = ({ tour }) => (
  <div className="tour-details">
    <p>Price: {tour.price}</p>
    <p>Rating: {parseFloat(tour.rating)}</p>
    <p>Order Count: {tour.orderCount}</p>
  </div>
);
export default TourDetails;