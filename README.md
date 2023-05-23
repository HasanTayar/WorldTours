# WorldTours (v4)

This project is a work-in-progress application called WorldTours (v4). It is built using a `React` frontend, an `Express(Node.js)` backend, and `MongoDB` as the database. This version focuses on the Chat system frontend and backend.
## Backend

The backend is built with Express and MongoDB. It includes the following files and directories:

### Controllers
- `ChatsController.js`: Contains the logic for handling chat data and database CRUD operations.

### Models
- `ChatRoom.js`: Defines the chat room schema for MongoDB.
- `ChatMessage.js`: Defines the message schema for MongoDB.

### Routes
- `ChatRoomRoutes`: Handles chat room-related operations.

  - `POST /initiate`: Initializes a chat room between two users. It expects the `senderId` and `receiverId` in the request body. If the chat room already exists, it returns the existing room ID. Otherwise, it creates a new chat room and returns the new room ID.

### Services
- `Socket`: Handles real-time communication using Socket.IO. It provides the following functionality:

  - `initialize(httpServer)`: Initializes the Socket.IO server and sets up event listeners for various socket events.

  - `getIO()`: Returns the Socket.IO instance.

The services are responsible for managing real-time messaging and interaction between clients.


## Frontend

The frontend is built with React and includes the following components for real-time chat:

### Real-Time Chat Components
- `ChatArea`
- `Message`
- `MessageInput`
- `SearchBar`
- `User`
- `UserList`

Additionally, there are components specifically designed for the chat bot:

### Chat Bot Components
- `MessageInput`
- `MessageItem`
- `MessageList`

The project also consists of the following pages:

### Pages
- `Chat`: Provides the user interface for real-time chat functionality.
- `ChatBot`: Displays the chat bot interface.

The frontend relies on the following services:

### Services
- `ChatBotService`: Manages chat bot functionality.
- `ChatService`: Empowered by Socket.IO, it handles real-time communication.

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
