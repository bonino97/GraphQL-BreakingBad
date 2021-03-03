import { getCharacters } from '../../lib/database-operations';
import { CHANGE_VOTES, CHANGE_VOTE } from '../../config/constants';

export async function sendNotification(pubSub: any, db: any, id: string) {
  const characters: Array<object> = await getCharacters(db);
  pubSub.publish(CHANGE_VOTES, { changeVotes: characters });
  const selectedCharacter = characters.filter(
    (character: any) => character.id === id
  )[0];
  pubSub.publish(CHANGE_VOTE, { changeVote: selectedCharacter });
}
