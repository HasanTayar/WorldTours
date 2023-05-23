const mongoose = require('mongoose');
const User = require('../Models/UserModel'); // Path to your User model
const faker = require('faker'); // Using Faker.js to generate random user data

async function createUsers() {
    for (let i = 0; i < 50; i++) {
        const newUser = new User({
            email: faker.internet.email(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            password: '123456', // This should be hashed
            phoneNumber: faker.phone.phoneNumber(),
            isVerified: faker.datatype.boolean(),
            isAdmin: false, // No admin user
            isOrganizer: faker.datatype.boolean(),
            bio: faker.lorem.paragraph(),
            rating: faker.datatype.float({min: 0, max: 5}),
            location: faker.address.cityName(),
            languages: [faker.random.word(), faker.random.word()],
            reviews: [
                {
                    reviewer: faker.name.findName(),
                    text: faker.lorem.sentences(),
                    rating: faker.datatype.float({min: 0, max: 5}),
                    date: faker.date.past(),
                },
            ],
            certifications: [faker.random.word(), faker.random.word()],
            specialties: [faker.random.word(), faker.random.word()],
            contactInfo: {
                contactEmail: faker.internet.email(),
                phone: faker.phone.phoneNumber(),
            },
        });

        await newUser.save(); // Save the user
    }

    console.log('50 users created successfully!');
}

// Make sure to connect to your MongoDB database before running this function
createUsers();
