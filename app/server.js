import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import debug from 'debug'
import morgan from 'morgan'
import partyRoutes from './routes/parties';
import officeRoutes from './routes/offices';

const app = express();
const logger = debug('app')
app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'))

const PORT = process.env.PORT || 3000;


app.use('/api/v1', partyRoutes);
app.use('/api/v1', officeRoutes);
// app.use('/api/v1', userRoutes);

app.listen(PORT, () => {
  logger(`Server is running on port ${PORT}`);
});

export default app; 