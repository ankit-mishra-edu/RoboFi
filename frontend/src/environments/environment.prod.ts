export const environment = {
  production: true,
  API_BASE_URL:
    process.env['API_BASE_URL'] || 'https://robofi.herokuapp.com/api',
  MEDIA_BASE_URL: `https://res.cloudinary.com/${
    process.env['CLOUDINARY_URL']?.includes(':')
      ? process.env['CLOUDINARY_URL']?.split(':')[2].split('@')[1]
      : 'hnose3kua'
  }/`,
  ADMIN_URL: process.env['ADMIN_URL'] || 'https://robofi.herokuapp.com/admin/',
};
