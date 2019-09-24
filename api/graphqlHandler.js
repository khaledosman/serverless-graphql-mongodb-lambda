const { ApolloServer, gql } = require('apollo-server-lambda')
const { resolvers } = require('../graphql/resolvers')
const responseCachePlugin = require('apollo-server-plugin-response-cache')
// const { RedisCache } = require('apollo-server-cache-redis')
const mongoose = require('mongoose')

let conn = null

const uri = process.env.DEV_MONGO
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // By default, the GraphQL Playground interface and GraphQL introspection
  // is disabled in "production" (i.e. when `process.env.NODE_ENV` is `production`).
  //
  // If you'd like to have GraphQL Playground and introspection enabled in production,
  // the `playground` and `introspection` options must be set explicitly to `true`.
  playground: {
    endpoint: process.env.AWS_STAGE === 'dev' ? `${process.env.DEV_URL}/graphql` : `${process.env.LIVE_URL}/graphql`
  },
  introspection: true,
  tracing: true,
  cacheControl: {
    defaultMaxAge: 10
  },
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
    debugPrintReports: true,
    schemaTag: process.env.AWS_STAGE
  },
  // cache: new RedisCache({
  //   host: 'redis-server'
  //   // Options are passed through to the Redis client
  // }),

  plugins: [responseCachePlugin()],
  schemaTag: process.env.AWS_STAGE,
  context: async ({ event, context }) => {
    // get the user token from the headers
    // const token = req.headers.authorization || ''

    // try to retrieve a user with the token
    // const user = getUser(token)

    // add the user to the context
    // return { user }
    context.callbackWaitsForEmptyEventLoop = false

    // Because `conn` is in the global scope, Lambda may retain it between
    // function calls thanks to `callbackWaitsForEmptyEventLoop`.
    // This means your Lambda function doesn't have to go through the
    // potentially expensive process of connecting to MongoDB every time.
    if (conn === null) {
      conn = await mongoose.createConnection(uri, {
        // Buffering means mongoose will queue up operations if it gets
        // disconnected from MongoDB and send them when it reconnects.
        // With serverless, better to fail fast if not connected.
        bufferCommands: false, // Disable mongoose buffering
        bufferMaxEntries: 0 // and MongoDB driver buffering
      })
      // conn.model('Test', new mongoose.Schema({ name: String }))
    }
    return { mongoose: conn }
  },
  persistedQueries: {
    // cache: new RedisCache({
    //   host: 'redis-server'
    // // Options are passed through to the Redis client
    // })
  }
})

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true
  }
})
