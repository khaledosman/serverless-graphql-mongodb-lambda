export const hello = async (event, _context) => {
  _context.callbackWaitsForEmptyEventLoop = false
  // if a warming event
  if (event.source === 'serverless-plugin-warmup' || _context.custom.source === 'serverless-plugin-warmup') {
    console.log('WarmUp - Lambda is warm!')
    return {
      statusCode: 200,
      body: 'warmed'
    }
  }
  // else proceed with handler logic
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event
    }, null, 2)
  }
}
