// import './config/db.js'
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import express from 'express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { typeDefs, resolvers, pubsub, SUBSCRIPTIONS_EVENTS } from './schema.js';
import { rooms, users } from './data.js'
import { deleteUserAndRoom } from './utils/index.js';

const PORT = 4000;

const schema = makeExecutableSchema({ typeDefs, resolvers });
const app = express();

// Servers
const httpServer = createServer(app);
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});
const serverCleanup = useServer({
    schema,
    onDisconnect({ connectionParams }, code, reason) {
      const { user } = connectionParams
      deleteUserAndRoom(rooms, user)
      pubsub.publish(SUBSCRIPTIONS_EVENTS.ROOMS_UPDATED, { roomsUpdated: rooms })      
    },
  },
  wsServer
);

// Set up ApolloServer.
const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();
server.applyMiddleware({ app });

// Now that our HTTP server is fully set up, we can listen to it.
httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}${server.graphqlPath}`);
});