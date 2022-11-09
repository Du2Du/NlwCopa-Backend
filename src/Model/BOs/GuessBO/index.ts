import { guessDAO } from "../../DAOs";

export function guessBO() {
  const guessesCount = async () => {
    const guessCount = await guessDAO.count();
    return { count: guessCount };
  };

  return {
    guessesCount,
  };
}
