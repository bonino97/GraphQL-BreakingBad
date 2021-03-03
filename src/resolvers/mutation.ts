import { IResolvers } from 'graphql-tools';
import { asignVoteId, getCharacter, getVote } from '../lib/database-operations';
import { Datetime } from '../lib/datetime';
import { COLLECTIONS } from '../config/constants';
import { response } from './helpers/response';
import { sendNotification } from './helpers/notification';

const mutation: IResolvers = {
  Mutation: {
    async addVote(__: void, { character }, { pubSub, db }) {
      const selectedCharacter = getCharacter(db, character);
      if (selectedCharacter == null) {
        return response(false, `El personaje no existe... `, db);
      }

      const vote = {
        id: await asignVoteId(db),
        character,
        createdAt: new Datetime().getCurrentDateTime(),
      };
      return await db
        .collection(COLLECTIONS.VOTES)
        .insertOne(vote)
        .then(async () => {
          sendNotification(pubSub, db);
          return response(true, `Voto emitido correctamente...`, db);
        })
        .catch(async () => {
          return response(false, `Ocurrio un error, intenta nuevamente...`, db);
        });
    },

    async updateVote(__: void, { id, character }, { pubSub, db }) {
      const selectedCharacter = await getCharacter(db, character);
      const selectedVote = await getVote(db, id);

      if (selectedCharacter == null) {
        return response(false, `El personaje no existe... `, db);
      }

      if (selectedVote == null) {
        return response(
          false,
          `El voto no existe, no se pudo actualizar... `,
          db
        );
      }

      return await db
        .collection(COLLECTIONS.VOTES)
        .updateOne(
          { id },
          {
            $set: { character },
          }
        )
        .then(async () => {
          sendNotification(pubSub, db);
          return response(true, `Voto actualizado correctamente...`, db);
        })
        .catch(async () => {
          return response(false, `Ocurrio un error, intenta nuevamente...`, db);
        });
    },

    async deleteVote(__: void, { id }, { pubSub, db }) {
      const selectedVote = await getVote(db, id);

      if (selectedVote == null) {
        return response(
          false,
          `El voto no existe, no se pudo eliminar... `,
          db
        );
      }
      return await db
        .collection(COLLECTIONS.VOTES)
        .deleteOne({ id })
        .then(async () => {
          sendNotification(pubSub, db);
          return response(true, `Voto eliminado correctamente...`, db);
        })
        .catch(async () => {
          return response(false, `Ocurrio un error, intenta nuevamente...`, db);
        });
    },
  },
};

export default mutation;
