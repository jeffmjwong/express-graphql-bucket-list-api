import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import db from './db';
import typeDefs from './graphql/schema';

const port = process.env.PORT || 3001;
const app = express();

const resolvers = {
  Query: {
    hello: () => 'Hello world from Apollo Server Express!',
    nodeEnv: () => process.env.NODE_ENV,
    bucketItems: async () => {
      try {
        const data = await db.any('SELECT * FROM bucket_items');
        return data;
      } catch(err) {
        console.log(err);
      }
    },
    bucketItem: async (parent, args, context, info) => {
      try {
        const data = await db.one('SELECT * FROM bucket_items WHERE id = $1', [args.id]);
        return data;
      } catch(err) {
        console.log(err);
      }
    }
  },
};

const graphqlServer = new ApolloServer({ typeDefs, resolvers });

graphqlServer.applyMiddleware({ app });

app.get('/', (req, res) => {
  res.send('Welcome to Express and GraphQL server!');
});

app.listen(port, () => {
  console.log(`Express server is now ready at http://localhost:${port}${graphqlServer.graphqlPath}`);
});
