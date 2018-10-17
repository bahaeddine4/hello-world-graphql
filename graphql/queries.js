const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = graphql;

const userModel = require('../mongo/user'); 
const userType = require('./schemas');

const query = new GraphQLObjectType({
  name: "query",
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


module.exports = query;
