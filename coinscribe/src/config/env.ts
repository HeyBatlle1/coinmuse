interface EnvConfig {
  GOOGLE_API_KEY: string;
}

export const env: EnvConfig = {
  GOOGLE_API_KEY: import.meta.env.VITE_GOOGLE_API_KEY,
};