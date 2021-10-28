import { registerAs } from '@nestjs/config';

const FALLBACK_MONGO_SRV = process.env.DB_SRV;
const FALLBACK_RUN_MIGRATIONS = Boolean(process.env.DB_RUN_MIGRATIONS) || true;

export default registerAs('mongodb', () => ({
  url: FALLBACK_MONGO_SRV,
  migrationsRun: FALLBACK_RUN_MIGRATIONS,
}));
