// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:8000/api',
  MEDIA_BASE_URL: `https://res.cloudinary.com/${
    process.env.CLOUDINARY_URL?.split(':')[2].split('@')[1]
  }/`,
  ADMIN_URL: process.env.API_BASE_URL || 'http://localhost:8000/admin/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
