import { getCharacters } from '../../lib/database-operations';
import { CHANGE_VOTES } from '../../config/constants';

export async function sendNotification(pubSub: any, db: any) {
  const characters = await getCharacters(db);
  return pubSub.publish(CHANGE_VOTES, { changeVotes: characters });
}
