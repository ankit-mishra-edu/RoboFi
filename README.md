# Robofi

Full Stack Web application using PostgreSQL, Angular & Django.

## Technologies Used

- Angular
- Django
- PostgreSQL

## Deployment

### Heroku

On the first deployment, some initial configuration is required. Click the button to get started:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/amishm766/RoboFi)

- App name: Pick a name for your project. Note the name needs to be copied into a couple of the config vars (see below).
- Region: Wherever you like.

Config Vars

Heroku config vars impact multiple aspects of the system:

- The Heroku "app"
- The Heroku build pipeline
- The Django and Angular runtime

Several variables must be set when first deploying the app:

- ALLOWED_HOSTS: Update the placeholder with the 'App name'.
- ALLOWED_ORIGINS: Update the placeholder with the 'App name'.
- API_BASE_URL: Update the placeholder with the 'App name'.
- EMAIL_HOST_USER: Update the placeholder with the 'App name'.
- EMAIL_HOST_PASSWORD: Update the placeholder with the 'App name'.

Some variables are optional and/or customisable:

- DEBUG: Optional. Set to true or false.
- SECRET_KEY: Optional. Set as per days.
- REFRESH_TOKEN_EXPIRATION_TIME: Optional. Set as per days.
- ACCESS_TOKEN_EXPIRATION_TIME: Optional. Set as per minutes.
