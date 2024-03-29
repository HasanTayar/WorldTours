const Tour = require("../Models/TourModel");
const Review = require("../Models/Review");
const User = require("../Models/UserModel");
const updateIsPopular = async () => {
  try {
    const tours = await Tour.find();

    for (let tour of tours) {
      const reviews = await Review.find({ tourId: tour._id });
      const totalRating = reviews.reduce((sum, review) => sum + parseFloat(review.rating), 0);
      const avgRating = totalRating / reviews.length;
      
      const isPopular = avgRating > 4 && reviews.length > 50 && tour.orderCount > 100;

      await Tour.updateOne(
        { _id: tour._id },
        { $set: { isPopular: isPopular } }
      );
    }
  } catch (err) {
    console.error("Error updating isPopular field:", err);
  }
};

exports.createTour = async (req, res) => {
  try {
    console.log(req.body);
    const { organizerId, name, desc, days, tags, price } = req.body;

    // Fetch the user using organizerId
    const user = await User.findById(organizerId);
    if (!user || !user.location) {
      return res.status(404).send({ message: "Organizer or their location not found." });
    }

    // Use the user's location for the tour
    const userLocation = {
      locationName: user.location.name,
      long: user.location.lng,
      lat: user.location.lat
    };

    const tour = new Tour({
      organizerId,
      name,
      desc,
      photoTimeline: "",
      price,
      days: days && days !== "" 
        ? JSON.parse(days).map((day) => ({
            ...day,
            photo: day.photo ? day.photo : [],
          }))
        : [],
      locations: [userLocation],
      tags: tags,
    });

    if (req.files && req.files.length > 0) {
      const photoTimelineFile = req.files.find(
        (file) => file.fieldname === "timelinePhoto"
      );

      if (photoTimelineFile) {
        console.log("Processing photoTimeline:", photoTimelineFile);
        tour.photoTimeline = `/toursPhotos/${photoTimelineFile.filename}`;
      } else {
        console.log("Invalid photoTimeline object:", photoTimelineFile);
      }

      for (let i = 0; i < tour.days.length; i++) {
        const day = tour.days[i];
        const dayPhotos = req.files.filter(
          (file) => file.fieldname === `dayPhotos[${i}]`
        );

        if (dayPhotos) {
          for (const photo of dayPhotos) {
            console.log("Processing day photo:", photo);
            day.photo.push(`/toursPhotos/${photo.filename}`);
          }
        }
      }
    }

    const savedTour = await tour.save();
    await updateIsPopular();
    res.status(201).send({ message: "Tour created successfully.", tour: savedTour });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "An error occurred while creating the tour. Please try again.",
    });
  }
};


// Get all tours
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).send(tours);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "An error occurred while fetching tours. Please try again.",
    });
  }
};



// Get a specific tour by ID
exports.getTourById = async (req, res) => {
  try {
    const tourId = req.params.tourId;
    const tour = await Tour.findById(tourId);

    if (!tour) {
      res.status(404).send({ message: "Tour not found." });
    } else {
      res.status(200).send(tour);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "An error occurred while fetching the tour. Please try again.",
    });
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
      res.status(404).send({ message: "Tour not found." });
    } else {
      await updateIsPopular();
      res.status(200).send({ message: "Tour updated successfully.", tour });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "An error occurred while updating the tour. Please try again.",
    });
  }
};

// Delete a specific tour by ID
exports.deleteTourById = async (req, res) => {
  try {
    const tourId = req.params.tourId;
    const tour = await Tour.findByIdAndDelete(tourId);

    if (!tour) {
      res.status(404).send({ message: "Tour not found." });
    } else {
      res.status(200).send({ message: "Tour deleted successfully." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "An error occurred while deleting the tour. Please try again.",
    });
  }
};
const earthRadiusInKm = 6371;

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * earthRadiusInKm;
};

const axios = require('axios');

// This function is a placeholder. 
// You would need to implement it using an API or database to get the country from a city name.
const getCountryFromCity = async (city) => {
  // Fetch the country for the provided city
  // This is a mockup, replace it with your real implementation
  // For instance, if you use the OpenCage Geocoding API, you would send a request and parse the 'country' from the response
   const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=444c8d9d26a3486eb666df53c28a5b49`);

   return response.data.results[0].components.country;
  return "Some Country"; 
};

exports.getToursByLocation = async (req, res) => {
  const { userLat, userLong, userCountry } = req.query;
  console.log(req.query);

  try {
    const tours = await Tour.find();

    const countryTours = [];

    for (const tour of tours) {
      for (const loc of tour.locations) {
        if (await getCountryFromCity(loc.locationName) === userCountry) {
          countryTours.push(tour);
          break;
        }
      }
    }

    const sortedTours = countryTours
      .map((tour) => {
        const nearestLocation = tour.locations.reduce(
          (min, loc) => {
            const distance = haversineDistance(
              userLat,
              userLong,
              parseFloat(loc.lat),
              parseFloat(loc.long)
            );

            return distance < min.distance ? { location: loc, distance } : min;
          },
          { location: null, distance: Infinity }
        );

        return { tour, distance: nearestLocation.distance };
      })
      .sort((a, b) => a.distance - b.distance);

    res.status(200).send({ tours: sortedTours });
    console.log(sortedTours);
  } catch (err) {
    console.error("Error fetching tours by user location:", err);
    res.status(500).send({ message: "Error fetching tours by user location" });
  }
};



// Upload photos for a tour
exports.uploadTourPhotos = async (req, res) => {
  try {
    const { tourId } = req.params;
    const tour = await Tour.findById(tourId);

    if (!tour) {
      res.status(404).send({ message: "Tour not found." });
      return;
    }

    const newPhotos = req.files.map((file) => `/toursPhotos/${file.filename}`);

    tour.photoTimeline = [...tour.photoTimeline, ...newPhotos];

    for (let i = 0; i < tour.days.length; i++) {
      const day = tour.days[i];
      day.photo = [...day.photo, ...newPhotos];
    }

    await tour.save();

    res
      .status(200)
      .send({ message: "Tour photos uploaded successfully.", newPhotos });
  } catch (err) {
    console.error("Error uploading tour photos:", err);
    res.status(500).send({ message: "Error uploading tour photos." });
  }
};
