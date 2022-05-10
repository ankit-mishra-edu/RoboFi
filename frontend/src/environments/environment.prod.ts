export const environment = {
  production: true,
  API_BASE_URL: process.env.API_BASE_URL || 'https://robofi.herokuapp.com/api',
  MEDIA_BASE_URL: `https://res.cloudinary.com/${
    process.env.CLOUDINARY_URL?.split(':')[2].split('@')[1]
  }/`,
  ADMIN_URL: process.env.API_BASE_URL || 'https://robofi.herokuapp.com/admin/',
};
