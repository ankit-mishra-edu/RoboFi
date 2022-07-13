export const environment = {
  production: true,
  API_BASE_URL:
    process.env['API_BASE_URL'] || 'https://robofi.herokuapp.com/api',
  WS_RECONNECT_INTERVAL: 5,
  WS_BASE_URL: process.env['WS_BASE_URL'] || 'wss://robofi.herokuapp.com/ws',
  MEDIA_BASE_URL: `https://res.cloudinary.com/${
    process.env['CLOUDINARY_URL']?.includes(':')
      ? process.env['CLOUDINARY_URL']?.split(':')[2].split('@')[1]
      : 'hnose3kua'
  }/`,
  ADMIN_URL: process.env['ADMIN_URL'] || 'https://robofi.herokuapp.com/admin/',
};
