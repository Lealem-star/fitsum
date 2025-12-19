# MERN Stack Application

A full-stack application built with MongoDB, Express, React, and Node.js.

## Project Structure

```
mern-stack-app/
├── client/          # React frontend
├── server/          # Express backend
├── package.json     # Root package.json with scripts
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation

1. Install root dependencies:
```bash
npm install
```

2. Install server dependencies:
```bash
npm run install-server
```

3. Install client dependencies:
```bash
npm run install-client
```

Or install all at once:
```bash
npm run install-all
```

## Configuration

1. Create a `.env` file in the `server` directory:
```bash
cd server
cp .env.example .env
```

2. Update the `.env` file with your MongoDB connection string:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mernapp
NODE_ENV=development
```

For MongoDB Atlas, use:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mernapp
```

## Running the Application

### Development Mode (runs both server and client)
```bash
npm run dev
```

### Run Server Only
```bash
npm run server
```

### Run Client Only
```bash
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Available Scripts

- `npm run dev` - Runs both server and client concurrently
- `npm run server` - Runs only the Express server
- `npm run client` - Runs only the React app
- `npm run install-all` - Installs dependencies for both server and client

## Tech Stack

- **Frontend**: React 18
- **Backend**: Express.js
- **Database**: MongoDB with Mongoose
- **Development**: Nodemon, Concurrently

## API Endpoints

- `GET /` - Welcome message
- `GET /api/test` - Test API endpoint

## License

ISC

