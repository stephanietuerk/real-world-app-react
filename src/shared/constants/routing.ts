export type RouteId =
  | 'home'
  | 'login'
  | 'register'
  | 'settings'
  | 'profile'
  | 'article'
  | 'editor';

export const ROUTE = {
  home: '/',
  login: '/login',
  register: '/register',
  settings: '/settings',
  profile: (username?: string) => `/profile/${username ?? 'username'}`,
  article: (slug: string) => `/article/${slug}`,
  editor: (slug?: string) => (slug ? `/editor/${slug}` : '/editor'),
} as const;

interface RouteConfig {
  key: RouteId;
  path: (param?: string) => string;
  display: string;
  type: 'page' | 'dialog';
  requiresParam?: boolean;
}

export const ROUTES_NO_AUTH: RouteConfig[] = [
  {
    key: 'home',
    path: () => ROUTE.home,
    display: 'Home',
    type: 'page',
  },
  {
    key: 'login',
    path: () => ROUTE.login,
    display: 'Sign In',
    type: 'dialog',
  },
  {
    key: 'register',
    path: () => ROUTE.register,
    display: 'Sign Up',
    type: 'dialog',
  },
];

export const ROUTES_AUTH: RouteConfig[] = [
  {
    key: 'home',
    path: () => ROUTE.home,
    display: 'Home',
    type: 'page',
  },
  {
    key: 'editor',
    path: (slug?: string) => ROUTE.editor(slug),
    display: 'New Post',
    type: 'page',
    requiresParam: false,
  },
  {
    key: 'settings',
    path: () => ROUTE.settings,
    display: 'Settings',
    type: 'page',
  },
  {
    key: 'profile',
    path: (username?: string) => ROUTE.profile(username),
    display: 'My Profile',
    type: 'page',
    requiresParam: true,
  },
];
