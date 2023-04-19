# WorldTours (v2)

This project is a work-in-progress application called WorldTours (v2). It is built using a `React` frontend, an `Express(Node.js)` backend, and `MongoDB` as the database. This version focuses on the Tours frontend and backend.

## Backend

The backend is built with Express and MongoDB. It includes the following files and directories:

- `ToursController.js`: Contains the logic for handling Tours data and database CRUD operations.
- `ToursModel.js`: Defines the Tour schema for MongoDB.
- `db.js`: Configures the connection to the MongoDB database.

## Frontend

The frontend is built with React and includes the following components:

-`AddTour`
-`GoogleLoaction`
The project uses Vite for development and is configured with the following settings:

- `vite.config.js`: Contains Vite configuration for the React plugin, server settings, and proxy settings.

## Installation

1. Clone the repository.
2. Install dependencies for both frontend and backend using `npm install`.
3. Start the backend server using `node index.js` or `npm start` (make sure MongoDB is running).
4. Start the frontend development server using `npm run dev` or `vite`.

## License

This project is licensed under the MIT License. For more information, please see the [LICENSE](LICENSE) file.

## Notice

This project is still under development and is not complete yet. Please note that some features may not work as expected, and the code might change significantly before the final release.
