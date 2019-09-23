const { ApolloServer, gql } = require('apollo-server-lambda')
const { resolvers } = require('../graphql/resolvers')
const responseCachePlugin = require('apollo-server-plugin-response-cache')

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
    debugPrintReports: true
  },
  //  cache: new RedisCache({
  //   host: 'redis-server',
  //   // Options are passed through to the Redis client
  // }),

  plugins: [responseCachePlugin()],
  schemaTag: process.env.AWS_STAGE
  // context: ({ req }) => {
  //   // get the user token from the headers
  //   const token = req.headers.authorization || ''

  //   // try to retrieve a user with the token
  //   const user = getUser(token)

  //   // add the user to the context
  //   return { user }
  // }
  // persistedQueries: {
  //  cache: new RedisCache({
  //   host: 'redis-server',
  //   // Options are passed through to the Redis client
  // }),
  // },
})

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true
  }
})
