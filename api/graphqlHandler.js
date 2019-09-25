
const { server } = require('../graphql/apollo-server')
const { initConnection } = require('../database/connection')

exports.graphqlHandler = (event, context, callback) => {
  // context.callbackWaitsForEmptyEventLoop = false
  // warmup plugin early return
  if (event.source === 'serverless-plugin-warmup' || (context.custom && context.custom.source === 'serverless-plugin-warmup')) {
    console.log('WarmUp - Lambda is warm!')
    return {}
  }
  initConnection().then((connection) => {
    server.createHandler({
      cors: {
        origin: '*',
        credentials: true
      }
    })(event, context, callback)
  })
}
