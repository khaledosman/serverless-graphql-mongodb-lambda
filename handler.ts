import { APIGatewayProxyHandler, APIGatewayEvent } from 'aws-lambda'
import 'source-map-support/register'
import warmer from 'lambda-warmer'

export const hello: APIGatewayProxyHandler = async (event: APIGatewayEvent, _context) => {
  // if a warming event
  if (await warmer(event)) {
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
