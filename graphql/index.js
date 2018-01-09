import {GraphQLSchema} from 'graphql';
import {RootQuery} from './queries';
import * as types from './types';
import {UserType} from './types';

console.log(UserType);
export default new GraphQLSchema({
    types: [UserType],
    query: RootQuery
});