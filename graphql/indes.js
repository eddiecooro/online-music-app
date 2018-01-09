import {GraphQLSchema} from 'graphql';
import {RootQuery} from './queries';

export default new GraphQLSchema({
    query: RootQuery
});