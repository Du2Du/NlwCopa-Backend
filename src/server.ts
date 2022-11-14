import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import Fastify from "fastify";
import {
  AuthController,
  GuessController,
  PoolController,
  UserController,
} from "./Controllers";

async function start() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(fastifyCors, {
    origin: true,
  });

  fastify.register(fastifyJwt, {
    secret: process.env.SECRET_KEY ?? "",
  });

  PoolController(fastify);
  UserController(fastify);
  GuessController(fastify);
  AuthController(fastify);

  fastify.listen({ port: 8091 });
}

start();
