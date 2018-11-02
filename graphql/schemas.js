import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const userType = new GraphQLObjectType({
  name: 'user',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    password: { type: GraphQLString },
  },
});

export default userType;
