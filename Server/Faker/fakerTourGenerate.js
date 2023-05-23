const mongoose = require('mongoose');
const User = require('../Models/UserModel');
const Tour = require('../Models/TourModel');
const faker = require('faker');

async function createTours() {
  const organizers = await User.find({ isOrganizer: true });

  if (!organizers.length) {
    console.log('No organizers found in the database!');
    return;
  }

  const tourNames = ['Hiking', 'Safari', 'Skiing', 'Cycling', 'Climbing', 'Snorkeling', 'Camping', 'Fishing', 'Kayaking', 'Surfing'];
  const locations = {
    'Alps': {lat: 46.8876, long: 9.6570},
    'Amazon Rainforest': {lat: -3.4653, long: -62.2159},
    'Grand Canyon': {lat: 36.1069, long: -112.1129},
    'Great Barrier Reef': {lat: -18.2871, long: 147.6991},
    'Himalayas': {lat: 27.9857, long: 86.9236},
    'Sahara Desert': {lat: 25.0000, long: 16.0000},
    'Yellowstone National Park': {lat: 44.4275, long: -110.5884},
    'Yosemite National Park': {lat: 37.8651, long: -119.5383},
    'Niagara Falls': {lat: 43.0962, long: -79.0377},
    'Galapagos Islands': {lat: -0.9537, long: -90.9656}
  }
  const tags = ['Adventure', 'Wildlife', 'Nature', 'Outdoor', 'Landmark', 'Historical', 'Cultural', 'Relaxation', 'Extreme', 'Scenic'];
  
  for (let i = 0; i < 50; i++) {
    const randomOrganizerIndex = Math.floor(Math.random() * organizers.length);
    const randomOrganizer = organizers[randomOrganizerIndex];
    const randomLocationName = faker.random.arrayElement(Object.keys(locations));
    const randomLocationCoords = locations[randomLocationName];
  
    const newTour = new Tour({
      organizerId: randomOrganizer._id,
      name: `${faker.random.arrayElement(tourNames)} in ${faker.random.arrayElement(locations)}`,
      desc: faker.lorem.paragraph(),
      photoTimeline: faker.image.imageUrl(),
      isPopular: faker.datatype.boolean(),
      price: faker.commerce.price(),
      orderCount: faker.datatype.number(100),
      days: [
        {
          dayName: faker.date.weekday(),
          photo: [faker.image.imageUrl()],
          desc: faker.lorem.sentences(),
        },
      ],
      tags: [faker.random.arrayElement(tags), faker.random.arrayElement(tags)],
      locations: [
        {
          locationName: randomLocationName,
          long: randomLocationCoords.long,
          lat: randomLocationCoords.lat,
        },
      ],
    });

    await newTour.save();
  }

  console.log('Tours created successfully!');
}

