import dotenv from 'dotenv';
dotenv.config();

interface ENV {
  NODE_ENV: string | undefined;
  PORT: number | undefined;
}

interface Config {
  NODE_ENV: string;
  PORT: number;
}

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const SanitizedConfig = getSanitzedConfig(config);

export default SanitizedConfig;