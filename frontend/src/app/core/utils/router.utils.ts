export const ROUTER_UTILS = {
  config: {
    base: {
      home: '',
      technology: 'technology',
    },
    technology: {
      python: {
        root: 'python',
      },
      java: {
        root: 'java',
      },
      'dot-net': {
        root: 'dot-net',
      },
    },
    auth: {
      root: 'auth',
      signIn: 'sign-in',
      signUp: 'sign-up',
      forgotPassword: 'forgot-password',
      forgotPasswordEmailSent: 'forgot-password-email-sent',
      passwordReset: 'password-reset',
      passwordResetFailed: 'password-reset-failed',
      passwordResetSucceeded: 'password-reset-succeeded',
    },
    settings: {
      root: 'settings',
      account: 'account',
      appearance: 'appearance',
      billing: 'billing',
      blockedUsers: 'blocked-users',
      notifications: 'notifications',
      security: 'security',
      securityLog: 'security-log',
    },
    user: {
      root: 'users',
      overview: 'overview',
      signOut: 'sign-out',
      profile: 'profile',
      editProfile: 'edit',
      editDetails: 'edit',
      changePassword: 'change-password',
    },
    errorResponse: {
      notFound: '404',
    },
    workflow: {
      root: 'workflow',
      editor: 'editor',
    },
    automation: {
      root: 'automation',
      home: 'home',
      dashboard: 'dashboard',
      configuration: {
        root: 'configurations',
        viewAll: 'view-all',

        entry: {
          root: 'entries',
          create: 'add',
          viewOrEdit: 'view-or-edit',
        },
      },
      microbot: {
        root: 'microbots',
        create: 'create',
        viewAll: 'view-all',
        viewOrEdit: 'view-or-edit',
      },
      specification: {
        root: 'specifications',
        create: 'create',
        viewAll: 'view-all',
        viewOrEdit: 'view-or-edit',
      },
    },
  },
};
