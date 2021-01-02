import { GraphQLServer, PubSub } from 'graphql-yoga'
import path from 'path'
import { Cell, Mutation, Query, Sheet, Subscription } from './graphql/resolvers'
import mongo from './mongo'

require('dotenv-defaults').config()

mongo.connect()

const pubsub = new PubSub()

const server = new GraphQLServer({
  typeDefs: path.join(__dirname, 'graphql', 'schema.graphql'),
  resolvers: {
    Query,
    Mutation,
    Subscription,
    Cell,
    Sheet
  },
  context: {
    pubsub
  }
})

server.start({ port: process.env.PORT | 4000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 4000}!`)
})
