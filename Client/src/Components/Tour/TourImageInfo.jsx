import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Modal from "react-modal";

const TourImageInfo = ({ tour, onUpdate }) => {
  const [image, setImage] = useState(tour.photoTimeline);
  const [days, setDays] = useState(tour.days);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentDayIndex, setCurrentDayIndex] = useState(null);

  useEffect(() => {
    setImage(tour.photoTimeline);
    setDays(tour.days);
  }, [tour]);
  days.forEach((i) => {
    console.log(i.photo);
  });
  const handleImageChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleDayImageChange = (dayIndex, event) => {
    const newDays = [...days];
    newDays[dayIndex].photo = URL.createObjectURL(event.target.files[0]);
    setDays(newDays);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedTour = { ...tour, photoTimeline: image, days };
    onUpdate(updatedTour);
    setModalIsOpen(false);
  };

  if (!image || !days) {
    return null;
  }

  return (
    <div className="tour-image-info">
      <h2>Image Information</h2>
      <Carousel>
        <div onClick={() => setModalIsOpen(true)}>
          <img src={image} alt={`Main Image`} />
        </div>
        {days.map((day, dayIndex) => (
          <div key={dayIndex}>
            {day.photo.map((photo, index) => (
              <div
                key={index}
                onClick={() => {
                  setCurrentDayIndex(dayIndex);
                  setCurrentImageIndex(index);
                  setModalIsOpen(true);
                }}
              >
                <img
                  src={photo}
                  alt={`Day ${dayIndex + 1} Image ${index + 1}`}
                />
              </div>
            ))}
          </div>
        ))}
      </Carousel>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h3>Edit Image</h3>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={(e) => {
            if (currentDayIndex !== null) {
              handleDayImageChange(currentDayIndex, currentImageIndex, e);
            } else {
              handleImageChange(e);
            }
          }}
        />
        <br></br>
        <button onClick={handleSubmit} className="btn btn-primary">
          Save
        </button>
      </Modal>
    </div>
  );
};
export default TourImageInfo;
