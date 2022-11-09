import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { userBO } from "../../Model/BOs";

export const UserController = (fastify: FastifyInstance) => {
  const { usersCount } = userBO();

  fastify.get("/users/count", async () => await usersCount());
};
