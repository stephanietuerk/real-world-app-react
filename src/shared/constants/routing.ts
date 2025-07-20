export const ROUTE = {
  home: '/',
  login: '/login',
  register: '/register',
  settings: '/settings',
  profile: (username: string) => `/profile/${username}`,
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
