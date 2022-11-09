import { FastifyInstance } from "fastify";
import { guessBO } from "../../Model/BOs";

export const GuessController = (fastify: FastifyInstance) => {
  const { guessesCount } = guessBO();
  
  fastify.get("/guesses/count", async () => await guessesCount());
};
