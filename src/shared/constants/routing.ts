export const ROUTE = {
  home: '/',
  login: '/login',
  register: '/register',
  settings: '/settings',
  profile: '/profile/:username',
  article: (slug: string) => `/article/${slug}`,
  editor: (slug?: string) => (slug ? `/editor/${slug}` : '/editor'),
} as const;

export const ROUTES_NO_AUTH: {
  path: string;
  display: string;
  type: 'page' | 'dialog';
}[] = [
  {
    path: ROUTE.home,
    display: 'Home',
    type: 'page',
  },
  {
    path: ROUTE.login,
    display: 'Sign In',
    type: 'dialog',
  },
  {
    path: ROUTE.register,
    display: 'Sign Up',
    type: 'dialog',
  },
];

export const ROUTES_AUTH = [
  {
    path: ROUTE.home,
    display: 'Home',
    type: 'page',
  },
  { path: ROUTE.editor(), display: 'New Post', type: 'page' },
  { path: ROUTE.settings, display: 'Settings', type: 'page' },
  { path: ROUTE.profile, display: 'Profile', type: 'page' },
];
