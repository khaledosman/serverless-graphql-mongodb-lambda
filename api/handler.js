module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: 'hello from serverless'
  }
}
