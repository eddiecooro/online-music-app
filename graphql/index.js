import {merge} from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';
import schema from './schema';

export default makeExecutableSchema({
    typeDefs: schema,
    resolvers,
})