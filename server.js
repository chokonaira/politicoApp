import express from 'express';


const port = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res, next) => {
  res.send('Hello World');
})
app.listen(PORT, () => {
  console.log(`server running on port ${port}`);
});

