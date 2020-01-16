const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const { existsSync, mkdirSync } = require('fs');

const typeDefs = require('./graphql/typeDefs');
const { MONGODB } = require('./config.js');
const resolvers = require('./graphql/resolvers'); 

const app = express();
existsSync(path.join(__dirname, "/static/images")) || mkdirSync(path.join(__dirname, "/static/images"));
app.use("/static", express.static(path.join(__dirname, "/static")));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
  playground: true,
}); 

const PORT = 5000 || process.env.PORT;
server.applyMiddleware({ app });

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MONGODB connected');
    app.listen({ port: PORT }, () => console.log(`Server running at ${server.graphqlPath}`));
  })
