module.exports = {
  client: {
    service: 'my-graph@dev',
    includes: ['./graphql/**/*.js']
  },
  service: {
    localSchemaFile: './graphql/schema.graphql'
  }
}
