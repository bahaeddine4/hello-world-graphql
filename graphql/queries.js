import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import userModel from '../mongo/user'
import userType from './schemas'

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


export default query;
