const isDev = import.meta.env.DEV; // Vite's way to check environment

export const logger = {
  debug: (...args) => isDev && console.log(...args),
  error: (...args) => console.error(...args),
};