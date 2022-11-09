import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  if (
    (await prisma.guess.count()) === 0 &&
    (await prisma.user.count()) === 0 &&
    (await prisma.game.count()) === 0
  ) {
    const user = await prisma.user.create({
      data: {
        email: "eduardohilario.eha@gmail.com",
        name: "Eduardo Hilário",
        avatarUrl: "https://github.com/Du2Du.png",
      },
    });

    const pool = await prisma.pool.create({
      data: {
        title: "Example Pool",
        code: "DUDU01",
        ownerId: user.id,
        participants: {
          create: {
            userId: user.id,
          },
        },
      },
    });

    await prisma.game.create({
      data: {
        date: "2022-11-02T12:00:00.627Z",
        firstTeamCountryCode: "DE",
        secondTeamCountryCode: "BR",
      },
    });

    await prisma.game.create({
      data: {
        date: "2022-11-03T12:00:00.627Z",
        firstTeamCountryCode: "BR",
        secondTeamCountryCode: "AR",
        guesses: {
          create: {
            firstTeamPoints: 2,
            secondTeamPoints: 1,
            participant: {
              connect: {
                userId_poolId: {
                  poolId: pool.id,
                  userId: user.id,
                },
              },
            },
          },
        },
      },
    });
  }
}

main();
