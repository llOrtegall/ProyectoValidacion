import { hash, compare } from 'bcryptjs';

const saltRounds = 10;

export const encrypt = async (pass: string) => {
  const passwordHash = await hash(pass, saltRounds);
  return passwordHash;
};

export const verified = async (pass: string, passHash: string) => {
  const passIsOk = await compare(pass, passHash);
  return passIsOk;
}