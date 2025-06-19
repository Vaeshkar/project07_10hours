import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import './db.js';

import router from './routes/index.js';
import { setupSwagger } from './swagger.js';
import { errorHandler } from './middlewares/errorHandler.js';

// Import necessary modules and initialize the Express application
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-netlify-site.netlify.app',
  'https://wbseventapi-be67e7cfc6b5.herokuapp.com',
];

const corsOptions = {
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) !== -1){
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));

const PORT = process.env.PORT ?? 3001;
const isProduction = process.env.ENVIRONMENT === 'production';

app.use(express.json());

if (!isProduction) {
  app.use(morgan('dev'));
  setupSwagger(app, PORT);
}

app.use('/api', router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('\x1b[33m%s\x1b[0m', `Server running on \x1b[36m ${corsOptions.origin[0]}:${PORT}`);
  if (!isProduction)
    console.log(
      '\x1b[33m%s\x1b[0m',
      `Swagger API docs available at \x1b[36m ${corsOptions.origin[0]}:${PORT}/api-docs`
    );
});
