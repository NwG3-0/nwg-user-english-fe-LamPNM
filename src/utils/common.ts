export interface AuthToken {
  email: string
  exp: number
  iat: number
  manager_id: string
  role: number
}

export interface Dropdown {
  id: number
  content: string
  path: string
}

export const MENU_HEADER = [
  {
    id: 1,
    name: 'Blog',
    path: '/post',
  },
  {
    id: 2,
    name: 'Collection',
    path: '/collection',
  },
  {
    id: 3,
    name: 'News',
    path: '/news',
  },
]

export const DROPDOWN_PRACTICE_MENU = [
  {
    id: 1,
    content: 'Listening',
    path: '/listening',
  },
  {
    id: 2,
    content: 'Reading',
    path: '/reading',
  },
  {
    id: 3,
    content: 'Speaking',
    path: '/speaking',
  },
  {
    id: 4,
    content: 'Writing',
    path: '/writing',
  },
]
export const DROPDOWN_TEST_MENU = [
  {
    id: 1,
    content: 'Word Test',
    path: '/word_test',
    type: 'link',
  },
  {
    id: 2,
    content: 'Overall Test',
    path: '/',
    type: 'link',
  },
]

export const DROPDOWN_USER_MENU = [
  {
    id: 1,
    content: 'User Profile',
    path: '/',
    type: 'link',
  },
  {
    id: 2,
    content: 'Log out',
    path: '/',
    type: 'div',
  },
]

export enum TYPE_MESSAGE {
  TEXT = 'text',
  GIF = 'gif',
  STICKER = 'sticker',
}

export const DEVICES = {
  MOBILE: 'mobile',
  WEB: 'web',
}
