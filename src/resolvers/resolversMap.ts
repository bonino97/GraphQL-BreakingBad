import { IResolvers } from 'graphql-tools';
import query from './query';
import type from './type';
import mutation from './mutation';
import subscription from './subscription';

export const LIST: string[] = [];
const resolvers: IResolvers = {
  ...query,
  ...mutation,
  ...subscription,
  ...type,
};

export default resolvers;
