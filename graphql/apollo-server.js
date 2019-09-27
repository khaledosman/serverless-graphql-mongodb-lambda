const { ApolloServer } = require('apollo-server-lambda')
const { resolvers } = require('./resolvers')
const { typeDefs } = require('./schema')
const responseCachePlugin = require('apollo-server-plugin-response-cache')
// const { RedisCache } = require('apollo-server-cache-redis')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: { endpoint: process.env.IS_OFFLINE ? 'http://localhost:3000/graphql' : `${process.env.BASE_URL}/graphql` },
  introspection: true,
  tracing: true,
  cacheControl: { defaultMaxAge: 10 },
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
    debugPrintReports: true,
    schemaTag: process.env.IS_OFFLINE ? 'offline' : process.env.AWS_STAGE
  },
  // cache: new RedisCache({
  //   host: 'redis-server'
  //   // Options are passed through to the Redis client
  // }),
  plugins: [responseCachePlugin()],
  schemaTag: process.env.IS_OFFLINE ? 'offline' : process.env.AWS_STAGE,
  context: async ({ event, context }) => {
    // get the user token from the headers
    // const token = req.headers.authorization || ''
    // try to retrieve a user with the token
    // const user = getUser(token)
    // add the user to the context
    // return { user }
  },
  persistedQueries: {
    // cache: new RedisCache({
    //   host: 'redis-server'
    // // Options are passed through to the Redis client
    // })
  }
})
module.exports = { server }
