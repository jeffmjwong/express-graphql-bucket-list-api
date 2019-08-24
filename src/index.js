import express from 'express';

import db from './db';

const port = process.env.PORT || 3001;
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to Express and GraphQL server!');
});

app.get('/node-env', (req, res) => {
  res.send(process.env.NODE_ENV);
});

app.get('/lists', (req, res) => {
  db.any('SELECT * FROM bucket_items')
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(error => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log(`Express server is now listening on port ${port}...`)
});
