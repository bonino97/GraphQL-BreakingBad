import { withFilter } from 'apollo-server-express';
import { IResolvers } from 'graphql-tools';
import { CHANGE_VOTES, CHANGE_VOTE } from '../config/constants';

const subcription: IResolvers = {
  Subscription: {
    changeVotes: {
      subscribe: (_: void, __: any, { pubSub }) => {
        return pubSub.asyncIterator(CHANGE_VOTES);
      },
    },
    changeVote: {
      subscribe: withFilter(
        (_: void, __: any, { pubSub }) => pubSub.asyncIterator(CHANGE_VOTE),
        (payload, variables) => {
          return payload.changeVote.id === variables.id;
        }
      ),
    },
  },
};

export default subcription;
