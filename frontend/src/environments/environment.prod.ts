export const environment = {
  production: true,
  API_BASE_URL: process.env?.API_BASE_URL
    ? process.env.API_BASE_URL
    : 'https://robofiui.herokuapp.com',
};
