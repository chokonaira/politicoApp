import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import partyRoutes from './routes/parties';
import officeRoutes from './routes/offices';
import AuthRoutes from './routes/users'
import candidateRoute from './routes/candidate'

const app = express();
app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;


app.use('/api/v1', partyRoutes);
app.use('/api/v1', officeRoutes);
app.use('/api/v1', AuthRoutes);
app.use('/api/v1', candidateRoute);
// app.use('/api/v1', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app; 