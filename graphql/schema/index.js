import types from './types';
import query from './Query';
import mutations from './Mutation';
import enums from './enums';

const typeDefs = [...query, ...mutations, ...types, ...enums];    

export default typeDefs;