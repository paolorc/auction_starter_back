import { registerAs } from '@nestjs/config';

const FALLBACK_JWT_SECRET = process.env.JWT_SECRET || 'bold_org';
const FALLBACK_JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export default registerAs('jwt', () => ({
  secret: FALLBACK_JWT_SECRET,
  signOptions: { expiresIn: FALLBACK_JWT_EXPIRES_IN },
}));
