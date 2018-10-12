const graphql = require("graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} = graphql;
const mongoose = require('mongoose');
const userModel = require('../mongo/user'); 

const users = [
  {
    id: "0",
    name: "john",
    password: "1"
  },
  {
    id: "1",
    name: "paul",
    password: "2"
  },
  {
    id: "2",
    name: "alain",
    password: "3"
  }
];

const userType = new GraphQLObjectType({
  name: "user",
  fields: {
    id: { type: GraphQLString }, 
    name: { type: GraphQLString },
    password: { type: GraphQLString }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    user: {
      type: userType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parentValue, args) {
        return users[args.id];
      }
    },
    users: {
      type: GraphQLList(userType),
      resolve(){
        return users
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    addUser: {
      type: userType,
      args: {
        name: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        }
      },
      resolve(parentValue, {name, password}) {
        const user = new userModel({name, password});
        return user.save()
          then(res => {
            console.log('success ', res);
            return res 
          })
          .catch(console.log) 
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
