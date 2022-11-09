import { z } from "zod";
import ShortUniqueId from "short-unique-id";
import { FastifyReply, FastifyRequest } from "fastify";
import { poolDAO } from "../../DAOs";

export function poolBO() {
  const poolsCount = async () => {
    const poolCount = await poolDAO.count();
    return { count: poolCount };
  };

  const createPool = async (req: FastifyRequest, res: FastifyReply) => {
    const createPoolBody = z.object({
      title: z.string(),
    });
    const { title } = createPoolBody.parse(req.body);

    if (title.trim().length === 0)
      return res.status(400).send({
        status: 400,
        message: "Insira um título para o bolão!",
        time: new Date(),
      });

    const generateCode = new ShortUniqueId({ length: 6 });
    const code = String(generateCode()).toUpperCase();

    const pool = await poolDAO.create({
      data: {
        title,
        code,
      },
    });

    return res.status(201).send(pool);
  };

  return {
    poolsCount,
    createPool,
  };
}
