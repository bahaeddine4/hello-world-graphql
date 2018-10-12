const express = require('express');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./graphql/schema');

const app = express();
mongoose.connect('mongodb://localhost:27017/test');
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))
app.listen(4000, () => console.log(`server listening on port 4000`))