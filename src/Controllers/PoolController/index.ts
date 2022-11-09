import { FastifyInstance } from "fastify";
import { poolBO } from "../../Model/BOs";

export const PoolController = (fastify: FastifyInstance) => {
  const { poolsCount, createPool } = poolBO();

  fastify.get("/pools/count", async () => await poolsCount());

  fastify.post("/pools", async (req, res) => await createPool(req, res));
};
