const { ApolloServer } = require('apollo-server-lambda')
const { importSchema } = require('graphql-import')
const { resolvers } = require('./resolvers')
const typeDefs = importSchema('./graphql/schema.graphql')
const responseCachePlugin = require('apollo-server-plugin-response-cache')
const { RedisCache } = require('apollo-server-cache-redis')

const redisOptions = {
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: process.env.REDIS_PORT
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks: true,
  playground: { endpoint: process.env.IS_OFFLINE ? 'http://localhost:3000/graphql' : `${process.env.BASE_URL}/graphql` },
  introspection: true,
  tracing: false,
  sendReportsImmediately: true,
  cacheControl: { defaultMaxAge: 10 },
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
    debugPrintReports: true,
    schemaTag: process.env.IS_OFFLINE ? 'offline' : process.env.AWS_STAGE
  },
  cache: new RedisCache(redisOptions),
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
    cache: new RedisCache(redisOptions)
  }
})
module.exports = { server }
