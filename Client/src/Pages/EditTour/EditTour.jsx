import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTourAndOrganizer, updateTour, deleteTour } from "../../Services/tourService";
import "./EditTour.scss";
import TourBasicInfo from "../../Components/Tour/TourBasicInfo";
import TourDayInfo from "../../Components/Tour/TourDayInfo";
import TourImageInfo from "../../Components/Tour/TourImageInfo";

const EditTour = () => {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [organizer, setOrganizer] = useState({});
  
  useEffect(() => {
    async function fetchTourOrganizer() {
      const { tour, organizer } = await fetchTourAndOrganizer(tourId);
      setTour(tour);
      setOrganizer(organizer);
    }

    fetchTourOrganizer();
  }, [tourId]);

  const handleUpdateTour = async (updatedTour) => {
    const { success } = await updateTour(tourId, updatedTour);
    if (success) {
      setTour(updatedTour);
      alert('Tour updated successfully!');
    } else {
      alert('Something went wrong. Please try again.');
    }
  };

  const handleDeleteTour = async () => {
    const { success } = await deleteTour(tourId);
    if (success) {
      alert('Tour deleted successfully!');
      navigate('/'); // Or to wherever you want to navigate after delete
    } else {
      alert('Something went wrong. Please try again.');
    }
  };

  if (!tour) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-tour">
      <h1>Edit Tour</h1>

      <TourBasicInfo tour={tour} onUpdate={handleUpdateTour} />

      <TourDayInfo tour={tour} onUpdate={handleUpdateTour} />

      <TourImageInfo tour={tour} onUpdate={handleUpdateTour} />

      <button className="btn btn-danger" onClick={handleDeleteTour}>Delete Tour</button>
    </div>
  );
}

export default EditTour;
