import express from 'express';

const port = process.env.PORT || 3001;
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to Express and GraphQL server!');
});

app.get('/node-env', (req, res) => {
  res.send(process.env.NODE_ENV);
});

app.listen(port, () => {
  console.log(`Express server is now listening on port ${port}...`)
});
