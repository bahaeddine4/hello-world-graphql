const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
} = graphql;

const userModel = require('../mongo/user'); 
const userType = require('./schemas');

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
      resolve(parentValue, {id, ...args}){  
        return userModel.findOneAndUpdate({_id: id}, args, {new: true, lean: true})
      } 
    }
  }
});

module.exports = mutation;