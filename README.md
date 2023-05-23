# WorldTours (v5)

Welcome to WorldTours v5. In this version, we are introducing several new features and enhancements that improve user engagement. Our main updates include:

1. Search functionality
2. Top picks for tours
3. Nearby tours
4. Popular tours
5. A completely redesigned home page

These features are built using a React frontend, an Express (Node.js) backend, and MongoDB as the database.

## Backend

The backend has been enhanced with new controllers to support the above features:

### Controllers

- `searchController.js`: Handles the search functionality in the application.
- `ToursController.js`: Fetches tours that are close to the user's current location.


### Models

- `search.js`: Defines the serach schema for MongoDB, now updated to accommodate the new features.


## Frontend

The frontend has been revamped with new components and pages to support our new features:

### Components

- `Search.js`: Handles user searches.
- `TopPicks.js`: Displays the user's top 5 picks on the home page after signing in.
- `NearbyTours.js`: Shows tours that are close to the user's current location.
- `PopularTours.js`: Lists the most popular tours based on booking frequency.

### Pages

- `Home.js`: The home page has been completely redesigned and now includes the new components like `TopPicks`, `NearbyTours`, and `PopularTours`.
### Services
- `SearchService` : That handle http request for the server side
## Installation

1. Clone the repository.
2. Install dependencies for both frontend and backend using `npm install`.
3. Start the backend server using `node index.js` or `npm start` (make sure MongoDB is running).
4. Start the frontend development server using `npm run dev` or `vite`.

## License

This project is licensed under the MIT License. For more information, please see the [LICENSE](LICENSE) file.

## Notice

This project is still under development. More features and improvements are planned for the upcoming versions. As it is a work in progress, some features may not work as expected and the code might change significantly before the final release.
