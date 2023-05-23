import { useState, useEffect } from "react";

const TourDayInfo = ({ tour, onUpdate }) => {
  const [days, setDays] = useState(tour.days);

  useEffect(() => {
    setDays(tour.days);
  }, [tour]);

  const handleDayChange = (index, field, value) => {
    const newDays = [...days];
    newDays[index][field] = value;
    setDays(newDays);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedTour = { ...tour, days };
    onUpdate(updatedTour);
  };

  if (!days) {
    return null;
  }

  return (
    <div className="tour-day-info">
      <h2>Day Information</h2>
      <form onSubmit={handleSubmit}>
        {days.map((day, index) => (
          <div key={index}>
            <h3>Day {index + 1}</h3>
            <input
              type="text"
              value={day.dayName}
              onChange={(e) => handleDayChange(index, "dayName", e.target.value)}
              placeholder="Day name"
            />
            <textarea
              value={day.desc}
              onChange={(e) => handleDayChange(index, "desc", e.target.value)}
              placeholder="Day description"
            />
          </div>
        ))}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default TourDayInfo;
