const resolvers = {
  Query: {
    hello: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('Hello after two seconds, cached for 10 seconds')
        }, 2000)
      })
    },
    user: () => {
      return {
        name: 'khaled',
        age: 12
      }
    }
  }
}

module.exports = { resolvers }
