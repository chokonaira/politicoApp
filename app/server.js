import express from 'express';
import bodyParser from 'body-parser';
import partyRoutes from './routes/parties';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = 3000;


app.use('/api/v1', partyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;