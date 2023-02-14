export const USER_INFO = '@user_library'
export const AUTH_TOKEN = '@token_library'

export const API_BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:4000'
export const API_DICTIONARY_URL = process.env.API_DICTIONARY_URL ?? 'https://api.dictionaryapi.dev/api/v2/entries/en/'

export interface EarliestPostResponse {
  data: EarliestPostResponseData
  message: string
  success: boolean
}

export interface EarliestPostResponseData {
  _id: string
  user: string
  posts: EarliestPosts[]
  date: number
}

export interface EarliestPosts {
  _id: string
  Description: string
  ImageTitle: string
  Title: string
  CreatedAt: number
  UpdatedAt: number
}
