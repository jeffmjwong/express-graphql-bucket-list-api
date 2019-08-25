import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

import db from './db';

const port = process.env.PORT || 3001;
const app = express();

const typeDefs = gql`
  type Query {
    hello: String,
    bucketItems: [BucketItem],
  }

  type BucketItem {
    id: ID,
    title: String,
    summary: String,
    completed_at: String,
    created_at: String,
    updated_at: String,
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world from Apollo Server Express!',
    bucketItems: async () => {
      try {
        const data = await db.any('SELECT * FROM bucket_items');
        console.log(data);
        return data;
      } catch(err) {
        console.log(err);
      }
      // db.any('SELECT * FROM bucket_items')
      //   .then(data => {
      //     console.log(data);
      //     return data;
      //   })
      //   .catch(error => {
      //     console.log(err);
      //   });
    },
  },
};

const graphqlServer = new ApolloServer({ typeDefs, resolvers });
console.log(graphqlServer.graphqlPath);

graphqlServer.applyMiddleware({ app });

app.listen(port, () => {
  console.log(`Express server is now ready at http://localhost:${port}${graphqlServer.graphqlPath}`);
});

// app.get('/', (req, res) => {
//   res.send('Welcome to Express and GraphQL server!');
// });

// app.get('/node-env', (req, res) => {
//   res.send(process.env.NODE_ENV);
// });

// app.get('/lists', (req, res) => {
//   db.any('SELECT * FROM bucket_items')
//     .then(data => {
//       console.log(data);
//       res.json(data);
//     })
//     .catch(error => {
//       console.log(err);
//     });
// });

// app.listen(port, () => {
//   console.log(`Express server is now listening on port ${port}...`)
// });
