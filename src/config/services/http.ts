import { registerAs } from '@nestjs/config';

const FALLBACK_HOST = process.env.API_HOST || '0.0.0.0';
const FALLBACK_PORT = process.env.API_PORT || '3000';
const FALLBACK_PREFIX = process.env.API_PREFIX || 'api';

export default registerAs('http', () => ({
  host: FALLBACK_HOST,
  port: FALLBACK_PORT,
  prefix: FALLBACK_PREFIX,
}));
