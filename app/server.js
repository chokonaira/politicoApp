import express from 'express';
import bodyParser from 'body-parser';
import partyRoutes from './routes/parties';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = 3000;


app.get('/', (req, res) => res.send('Hello!! Please navigate to `/api/v1/parties` or `/api/v1/offices`'));
app.use('/', partyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
