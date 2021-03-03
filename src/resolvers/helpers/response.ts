import { getCharacters } from '../../lib/database-operations';

export async function response(status: boolean, message: string, db: any) {
  const characters: Array<object> = await getCharacters(db);
  return {
    status,
    message,
    characters,
  };
}
