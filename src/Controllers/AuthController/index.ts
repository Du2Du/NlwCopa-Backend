import { FastifyInstance } from "fastify";
import { userBO } from "../../Model/BOs";
import { authenticate } from "../../Model/Plugins/Authenticate";

export const AuthController = (fastify: FastifyInstance) => {
  const { createUser, me } = userBO();

  fastify.get(
    "/me",
    {
      onRequest: [authenticate],
    },
    async (req, res) => await me(req, res)
  );

  fastify.post(
    "/users",
    async (req, res) => await createUser(req, res, fastify)
  );
};
