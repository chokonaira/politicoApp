import express from 'express';
// import bodyParser from 'body-parser';
import db from './db/db';

const app = express();

// app.use(body-bodyParser.json);
// app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/v1/data', (req, res)=>{
  res.status(200).send({
    success: 'true',
    message: 'Political party retrieved successfully',
    users: db

  })
});

const PORT = 3000;

app.listen(PORT, ()=> {
  console.log(`Server is running on port ${PORT}`)
});