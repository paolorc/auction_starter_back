import { registerAs } from '@nestjs/config';

const FALLBACK_MONGO_SRV = process.env.DB_SRV;

export default registerAs('mongodb', () => ({
  url: FALLBACK_MONGO_SRV,
}));
