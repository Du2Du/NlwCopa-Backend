import axios from "axios";
import { FastifyReply, FastifyRequest, FastifyInstance } from "fastify";
import { z } from "zod";
import { userDAO } from "../../DAOs";

export function userBO() {
  const usersCount = async () => {
    const userCount = await userDAO.count();
    return { count: userCount };
  };

  const createUser = async (
    req: FastifyRequest,
    res: FastifyReply,
    fastify: FastifyInstance
  ) => {
    const createUserBody = z.object({
      access_token: z.string(),
    });

    const { access_token } = createUserBody.parse(req.body);

    const userResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const userData = userResponse.data;

    const userInfoSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url(),
    });

    const userInfo = userInfoSchema.parse(userData);

    let user = await userDAO.findUnique({
      where: {
        googleId: userInfo.id,
      },
    });

    if (!user)
      user = await userDAO.create({
        data: {
          email: userInfo.email,
          name: userInfo.name,
          avatarUrl: userInfo.picture,
          googleId: userInfo.id,
        },
      });
    console.log(user);

    const token = fastify.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      { sub: user.id, expiresIn: process.env.TOKEN_EXPIRES }
    );

    return { token };
  };

  const me = async (req: FastifyRequest, res: FastifyReply) => {
    return { user: req.user };
  };

  return {
    usersCount,
    createUser,
    me,
  };
}
