import jwt from 'jsonwebtoken';

export function generateLoginToken(ip: string) {
  const token = jwt.sign({ ip }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  return token;
}
