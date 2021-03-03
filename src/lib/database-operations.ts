import { COLLECTIONS } from '../config/constants';

// CHARACTERS LIST
export async function getCharacters(db: any) {
  return await db
    .collection(COLLECTIONS.CHARACTERS)
    .find()
    .sort({ id: 1 })
    .toArray();
}

// SELECTED CHARACTER
export async function getCharacter(db: any, id: string) {
  return await db.collection(COLLECTIONS.CHARACTERS).findOne({ id });
}

// CHARACTER VOTES
export async function getCharacterVotes(db: any, id: string) {
  return await db.collection(COLLECTIONS.VOTES).find({ character: id }).count();
}

//ASIGN ID OF VOTE
export async function asignVoteId(db: any) {
  const lastVote = await db
    .collection(COLLECTIONS.VOTES)
    .find()
    .sort({ _id: -1 })
    .limit(1)
    .toArray();

  if (lastVote.length === 0) {
    return '1';
  }

  return String(+lastVote[0].id + 1);
}

// SELECTED VOTE
export async function getVote(db: any, id: string) {
  return await db.collection(COLLECTIONS.VOTES).findOne({ id });
}
