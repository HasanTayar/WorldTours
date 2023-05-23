import { useState, useEffect } from "react";

const TourBasicInfo = ({ tour, onUpdate }) => {
  const [name, setName] = useState(tour.name);
  const [desc, setDesc] = useState(tour.desc);
  const [price, setPrice] = useState(tour.price);

  useEffect(() => {
    setName(tour.name);
    setDesc(tour.desc);
    setPrice(tour.price);
  }, [tour]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedTour = { ...tour, name, desc, price };
    onUpdate(updatedTour);
  };

  return (
    <div className="tour-basic-info">
      <h2>Basic Information</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tour name"/>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description"/>
        <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="Price"/>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default TourBasicInfo;
