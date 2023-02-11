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
]
export const DROPDOWN_PRACTICE_MENU = [
  {
    id: 1,
    content: 'Listening',
    path: '/post',
    type: 'link',
  },
  {
    id: 2,
    content: 'Reading',
    path: '/book-hire',
    type: 'link',
  },
  {
    id: 3,
    content: 'Speaking',
    path: '/post',
    type: 'link',
  },
  {
    id: 4,
    content: 'Writting',
    path: '/book-hire',
    type: 'link',
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
