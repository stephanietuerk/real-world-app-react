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
