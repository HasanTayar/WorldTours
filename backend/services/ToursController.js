const Tour = require('../Models/TourModel');

const updateIsPopular = async () => {
    try {
      const topTours = await Tour.find().sort({ orderCount: -1 }).limit(5);
      const topTourIds = topTours.map(tour => tour._id);
  
      await Tour.updateMany(
        { _id: { $in: topTourIds } },
        { $set: { isPopular: true } }
      );
  
      await Tour.updateMany(
        { _id: { $nin: topTourIds } },
        { $set: { isPopular: false } }
      );
    } catch (err) {
      console.error('Error updating isPopular field:', err);
    }
  };
// Create a new tour
exports.createTour = async (req, res) => {
    try {
      const { organizerId, name, desc, photoTimeline, days, location } = req.body;
  
      const tour = new Tour({
        organizerId,
        name,
        desc,
        photoTimeline: typeof photoTimeline === 'string' ? photoTimeline : '',
        days: days.map((day) => ({
            ...day,
            photo: typeof day.photo === 'string' ? day.photo : ''
        })),
        location: Array.isArray(location) ? location : []
      });
  
      const savedTour = await tour.save();
      await updateIsPopular();
      res.status(201).send({ message: 'Tour created successfully.', tour: savedTour });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'An error occurred while creating the tour. Please try again.' });
    }
  };

  
// Get all tours
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).send(tours);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while fetching tours. Please try again.' });
  }
};

// Get a specific tour by ID
exports.getTourById = async (req, res) => {
  try {
    const tourId = req.params.tourId;
    const tour = await Tour.findById(tourId);

    if (!tour) {
      res.status(404).send({ message: 'Tour not found.' });
    } else {
      res.status(200).send(tour);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while fetching the tour. Please try again.' });
  }
};

// Update a specific tour by ID
exports.updateTourById = async (req, res) => {
  try {
    const tourId = req.params.tourId;
    const updatedData = req.body;

    const tour = await Tour.findByIdAndUpdate(tourId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!tour) {
      res.status(404).send({ message: 'Tour not found.' });
    } else {
        await updateIsPopular();
      res.status(200).send({ message: 'Tour updated successfully.', tour });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while updating the tour. Please try again.' });
  }
};

// Delete a specific tour by ID
exports.deleteTourById = async (req, res) => {
  try {
    const tourId = req.params.tourId;
    const tour = await Tour.findByIdAndDelete(tourId);

    if (!tour) {
      res.status(404).send({ message: 'Tour not found.' });
    } else {
      res.status(200).send({ message: 'Tour deleted successfully.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while deleting the tour. Please try again.' });
  }
};
const earthRadiusInKm = 6371;

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * earthRadiusInKm;
};

// Get tours by user location
exports.getToursByLocation = async (req, res) => {
  const { userLat, userLong } = req.query;

  try {
    const tours = await Tour.find();

    const sortedTours = tours
      .map((tour) => {
        const nearestLocation = tour.location.reduce((min, loc) => {
          const distance = haversineDistance(
            userLat,
            userLong,
            parseFloat(loc.lat),
            parseFloat(loc.long)
          );

          return distance < min.distance ? { location: loc, distance } : min;
        }, { location: null, distance: Infinity });

        return { tour, distance: nearestLocation.distance };
      })
      .sort((a, b) => a.distance - b.distance);

    res.status(200).send({ tours: sortedTours });
  } catch (err) {
    console.error('Error fetching tours by user location:', err);
    res.status(500).send({ message: 'Error fetching tours by user location' });
  }
};
