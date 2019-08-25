import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    hello: String,
    nodeEnv: String,
    bucketItems: [BucketItem],
    bucketItem(id: ID!): BucketItem,
  }

  type BucketItem {
    id: ID!,
    title: String,
    summary: String,
    completed_at: String,
    created_at: String,
    updated_at: String,
  }
`;
