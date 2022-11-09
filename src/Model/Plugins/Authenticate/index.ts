import { FastifyRequest } from "fastify";

export const authenticate = async (request: FastifyRequest) => {
  return await request.jwtVerify();
};
