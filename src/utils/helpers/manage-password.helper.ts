import 'dotenv/config';
import * as bcrypt from 'bcrypt';

export async function hashPasswordHelper(password: string) {
  if (!process.env.HASH_ROUNDS)
    throw new Error('Unable to get hash salt or rounds from env vars');
  const saltOrRounds = parseInt(process.env.HASH_ROUNDS);
  if (isNaN(saltOrRounds))
    throw new Error(
      'Unable to convert hash salt or rounds to int from env vars',
    );
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
}

export async function comparePasswordHelper(
  candidatePassword: string,
  correctPassword: string,
) {
  return await bcrypt.compare(candidatePassword, correctPassword);
}
