export const ENDPOINT_UTILS = {
  config: {
    base: {
      home: 'backend',
      media: 'media',
    },
    auth: {
      root: 'authentication',
      signIn: 'token',
      signUp: 'sign-up',
      signOut: 'sign-out',
      forgotPassword: 'forgot-password',
      passwordReset: 'password-reset',
      refreshToken: 'refresh',
    },
    user: {
      root: 'users',
      detail: 'details',
      profile: 'profiles',
      changePassword: 'change-password',
    },
    automation: {
      root: 'automation',
      configuration: 'configurations',
      configEntry: 'configuration/entries',
      microbot: 'microbots',
      specification: 'specifications',
    },
    settings: {
      root: 'settings',
      notification: 'notification',
    },
  },
};
