# WorldTours (v6)

Welcome to WorldTours v6. This version is focused on improving the admin dashboard and providing advanced features for managing the website and user data. The key updates include:

1. Enhanced Admin Dashboard: The admin dashboard has been completely redesigned with a user-friendly interface to manage website details, user tours, orders, requests, chat rooms, and more.

2. Advanced Data Visualization: The admin dashboard now includes powerful data visualization tools to analyze website performance, user engagement, and booking trends.

3. Improved User Management: The admin can easily manage user accounts, permissions, and access levels within the system.

4. Chat History Management: The admin can view and manage the chat history between users and customer support.

5. Comprehensive Reporting: Generate detailed reports on tours, bookings, revenue, and other key metrics to gain insights into the business performance.

## Backend

The backend has been updated with new controllers, models, and routes to support the admin functionality:

### Controllers

- `adminController.js`: Handles admin-related operations such as user management, data visualization, and reporting.


### Routes

- `adminRoutes.js`: Contains the API routes for admin-related operations.

## Frontend

The frontend has been expanded to include new components and pages for the admin dashboard:

### Components

- `AdminSidebar.js`: Displays the sidebar navigation for the admin dashboard.
- `DashboardOverview.js`: Provides an overview of website performance and key metrics.
- `UserManagement.js`: Allows the admin to manage user accounts and permissions.
- `DataVisualization.js`: Renders interactive charts and graphs for data analysis.
- `ChatHistory.js`: Shows the chat history between users and customer support.
- `Reports.js`: Generates comprehensive reports based on different criteria.

### Pages

- `AdminDashboard.js`: The main page for the admin dashboard, integrating all the components mentioned above.

## Installation

1. Clone the repository.
2. Install dependencies for both frontend and backend using `npm install`.
3. Start the backend server using `node index.js` or `npm start` (make sure MongoDB is running).
4. Start the frontend development server using `npm run dev` or any appropriate command for the build system used.

## License

This project is licensed under the MIT License. For more information, please see the [LICENSE](LICENSE) file.

## Notice

This project is still under development. Additional features and improvements are planned for future versions. As it is a work in progress, some functionality may not be fully implemented, and the code may undergo further changes before the final release.
