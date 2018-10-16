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
      resolve(parentValue, {id}) {  
        return userModel.findById(id)
      }
    },
    users: {
      type: GraphQLList(userType),
      resolve(){
        return userModel.find()
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
      }
    },
    removeUser: {
      type: userType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parentValue, {id}){
        return userModel.findByIdAndRemove(id)
      } 
    },
    updateUser: {
      type: userType,
      args: {
        id: {
          type: GraphQLString
        },
        name: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        }
      },
      resolve(parentValue, {id, name, password}){
        const set = {};
        if(name) {
          set['name'] = name
        }
        if(password) {
          set['password'] = password
        }
        return userModel.findOneAndUpdate({_id: id}, set)
      } 
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
