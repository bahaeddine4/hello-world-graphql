import express from 'express';
import expressGraphQL from 'express-graphql';
import mongoose from 'mongoose';
import schema from './graphql'

const app = express();
mongoose.connect('mongodb://localhost:27017/test');
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))
app.listen(4000, () => console.log(`server listening on port 4000`))