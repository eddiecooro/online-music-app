import types from './types';
import query from './Query';
import mutations from './Mutation';
import inputs from './inputs';
import enums from './enums';

const typeDefs = [...query, ...mutations, ...inputs, ...types, ...enums];    

export default typeDefs;