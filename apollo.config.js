module.exports = {
  client: {
    service: 'ovs-graph',
    includes: ['**/*.js']
  },
  service: {
    localSchemaFile: './graphql/schema.graphql'
  }
}
