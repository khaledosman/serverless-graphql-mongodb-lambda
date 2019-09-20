export const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  },
  User: {
    tweets: (obj, args) => {
      return ['user1', 'user2']
    }
  }
}
