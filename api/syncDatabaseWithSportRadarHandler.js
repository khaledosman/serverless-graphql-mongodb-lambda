module.exports.handler = async (event, context) => {
  if (event.source === 'serverless-plugin-warmup' || (context.custom && context.custom.source === 'serverless-plugin-warmup')) {
    console.log('WarmUp - Lambda is warm!')
    return {
      statusCode: 200,
      body: 'warmed'
    }
  } else {
    return {
      statusCode: 200,
      body: 'hello from serverless'
    }
  }
}
