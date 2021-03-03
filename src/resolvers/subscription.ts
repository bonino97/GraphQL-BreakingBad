import { IResolvers } from 'graphql-tools';
import { CHANGE_VOTES } from '../config/constants';

const subcription: IResolvers = {
  Subscription: {
    changeVotes: {
      subscribe: (_: void, __: any, { pubSub }) => {
        return pubSub.asyncIterator(CHANGE_VOTES);
      },
    },
  },
};

export default subcription;
