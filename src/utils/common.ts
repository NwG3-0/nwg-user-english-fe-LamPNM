import { NEWS } from '@src/models/news'

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
  type?: string
}

export interface NewsList {
  id: number
  name: string
  value: string
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

export const DROPDOWN_TEST_MENU: Dropdown[] = [
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

export const DROPDOWN_USER_MENU: Dropdown[] = [
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

export const NEWS_LIST: NewsList[] = [
  {
    id: 1,
    name: 'Sport',
    value: NEWS.SPORT,
  },
  {
    id: 2,
    name: 'Business',
    value: NEWS.BUSINESS,
  },
  {
    id: 3,
    name: 'Education',
    value: NEWS.EDUCATION,
  },
  {
    id: 4,
    name: 'Entertainment',
    value: NEWS.ENTERTAINMENT,
  },
  {
    id: 5,
    name: 'Music',
    value: NEWS.MUSIC,
  },
  {
    id: 6,
    name: 'Technology',
    value: NEWS.TECHNOLOGY,
  },
  {
    id: 7,
    name: 'Travel',
    value: NEWS.TRAVEL,
  },
]
