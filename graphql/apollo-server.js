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
  playground: { endpoint: process.env.IS_OFFLINE ? `http://localhost:3000/${process.env.AWS_STAGE}/graphql` : `${process.env.BASE_URL}/graphql` },
  introspection: true,
  tracing: false,
  sendReportsImmediately: true,
  cacheControl: { defaultMaxAge: 10 },
  cache: new RedisCache(redisOptions),
  plugins: [responseCachePlugin()],
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
