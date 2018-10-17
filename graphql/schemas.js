const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
} = graphql;

const userType = new GraphQLObjectType({
  name: "user",
  fields: {
    id: { type: GraphQLString }, 
    name: { type: GraphQLString },
    password: { type: GraphQLString }
  }
});

module.exports = userType;
