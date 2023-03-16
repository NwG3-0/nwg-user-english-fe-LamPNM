export const USER_INFO = '@user_ielts'
export const AUTH_TOKEN = '@token_user_ielts'

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

export interface PostDetailResponse {
  data: PostDetailResponseData
  message: string
  success: boolean
}

export interface NewsDetailResponse {
  data: NewsDetailResponseData
  message: string
  success: boolean
}

export interface PostDetailResponseData {
  _id: string
  Title: string
  Description: string
  ImageTitle: string
  Device: string
  CreatedAt: number
  UpdatedAt: number
}

export interface NewsDetailResponseData {
  _id: string
  Title: string
  Type: string
  Content: string
  View: number
  Image: string
  Device: string
  CreatedAt: number
  UpdatedAt: number
}
