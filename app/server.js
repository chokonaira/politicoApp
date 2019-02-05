import express from 'express';
import bodyParser from 'body-parser';
import partyRoutes from './routes/parties';
import officeRoutes from './routes/offices';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = 3000;


app.use('/api/v1', partyRoutes);
app.use('/api/v1', officeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app; 