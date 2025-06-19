import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import './db.js';

import router from './routes/index.js';
import { setupSwagger } from './swagger.js';
import { errorHandler } from './middlewares/errorHandler.js';

// Import necessary modules and initialize the Express application
const corsOptions = {
  origin: [
    'http://localhost:5173', // local frontend
    'https://your-frontend-url.netlify.app', // replace with your real frontend URL
  ],
  credentials: true,
};

const app = express();
// Initialize the database connection
app.use(cors(corsOptions));
// Set up CORS to allow requests from specific origins
// and allow credentials (cookies, authorization headers, etc.)
const PORT = process.env.PORT ?? 3001;
const isProduction = process.env.ENVIRONMENT === 'production';

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to log HTTP requests in development mode
// and set up Swagger documentation if not in production
if (!isProduction) {
  app.use(morgan('dev'));
  setupSwagger(app, PORT);
}

// Define the routes for the application
// Import the router from the routes directory
// This router will handle all API endpoints
app.use('/api', router);
app.use(errorHandler);

// Error handling middleware to catch any errors that occur in the application
// This middleware will log the error and send a response to the client
app.listen(PORT, () => {
  console.log('\x1b[33m%s\x1b[0m', `Server running on \x1b[36m http://localhost:${PORT}`);
  if (!isProduction)
    console.log(
      '\x1b[33m%s\x1b[0m',
      `Swagger API docs available at \x1b[36m http://localhost:${PORT}/api-docs`
    );
});
