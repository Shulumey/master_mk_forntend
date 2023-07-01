let isElectron = require("is-electron");
export const environment = {
  production: true,
  isDesktop: () => isElectron(),
  isBrowser: () => !isElectron(),
  apiUrl: "https://localhost:7211/",
};
