import crypto from 'crypto'
import { NEWS } from '@src/models/news'

export interface AuthToken {
  email: string
  exp: number
  iat: number
  manager_id: string
  role: number
}

export interface MenuHeader {
  id: string
  name: string
}

export interface MenuHeaderUser {
  id: string
  name: string
  link: string
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

export const MENU_HEADER: MenuHeader[] = [
  {
    id: 'aboutUs',
    name: 'About Us',
  },
  {
    id: 'roadMap',
    name: 'Road Map',
  },
]

export const MENU_HEADER_USER: MenuHeaderUser[] = [
  {
    id: 'news',
    name: 'News',
    link: '/news',
  },
  {
    id: 'post',
    name: 'Post',
    link: '/post',
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
    path: '/user_profile',
    type: 'link',
  },
  {
    id: 2,
    content: 'Log out',
    path: '/',
    type: 'div',
  },
]

export const DROPDOWN_MORE: Dropdown[] = [
  {
    id: 1,
    content: 'News',
    path: '/news',
    type: 'link',
  },
  {
    id: 2,
    content: 'Post',
    path: '/post',
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

export function getHash(key: string, data: string) {
  const hmac = crypto.createHmac('sha256', key)
  hmac.update(data)
  return hmac.digest('hex')
}
