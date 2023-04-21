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
  console.log('req.body:', req.body);

  try {
    const { organizerId, name, desc, days, location } = req.body;

    const tour = new Tour({
      organizerId,
      name,
      desc,
      photoTimeline: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png', // Set a default value here
      days: days ? JSON.parse(days).map((day) => ({
        ...day,
        photo: day.photo ? day.photo : [] // If day.photo is undefined or falsy, set it to an empty array
      })) : [] ,
      location: location ? JSON.parse(location) : null
    });

    // Save tour photo
    const photoTimelineFile = req.files['photoTimeline'];

    if (photoTimelineFile) {
      console.log('Processing photoTimeline:', photoTimelineFile);
      tour.photoTimeline = `/toursPhotos/${photoTimelineFile[0].filename}`;
    } else {
      console.log('Invalid photoTimeline object:', photoTimelineFile);
    }

    // Save day photos
    for (let i = 0; i < tour.days.length; i++) {
      const day = tour.days[i];
      const dayPhotos = req.files[`days[${i}].photo`];

      if (dayPhotos) {
        for (const photo of dayPhotos) {
          console.log('Processing day photo:', photo);
          day.photo.push(`/toursPhotos/${photo.filename}`);
        }
      }
    }

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
// Upload photos for a tour
exports.uploadTourPhotos = async (req, res) => {
    try {
      const { tourId } = req.params;
      const tour = await Tour.findById(tourId);
  
      if (!tour) {
        res.status(404).send({ message: 'Tour not found.' });
        return;
      }
  
      const newPhotos = req.files.map((file) => `${tourId}-${Date.now()}-${file.originalname}`);
  
      const filePaths = req.files.map((file) => file.path);
  
      tour.photoTimeline = [...tour.photoTimeline, ...filePaths];
  
      for (let i = 0; i < tour.days.length; i++) {
        const day = tour.days[i];
        day.photo = [...day.photo, ...filePaths];
      }
  
      await tour.save();
  
      res.status(200).send({ message: 'Tour photos uploaded successfully.', newPhotos });
    } catch (err) {
      console.error('Error uploading tour photos:', err);
      res.status(500).send({ message: 'Error uploading tour photos.' });
    }
  };
  

