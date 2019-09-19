import { APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'

export const hello: APIGatewayProxyHandler = async (event: any, _context) => {
  // if a warming event
  if (event.source === 'serverless-plugin-warmup') {
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
