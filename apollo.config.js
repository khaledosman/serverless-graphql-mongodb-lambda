module.exports = {
  client: {
    service: 'ovs-graph@dev',
    includes: ['./graphql/**/*.js']
  },
  service: {
    localSchemaFile: './graphql/schema.graphql'
  }
}
