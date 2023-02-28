interface ENV {
  API_URL?: string;
}

interface Config {
  API_URL: string
}

const getConfig = (): ENV => {
  return {
    API_URL: import.meta.env.VITE_API_URL
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