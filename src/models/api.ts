export const USER_INFO = '@user_ielts'
export const AUTH_TOKEN = '@token_user_ielts'

export const API_BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:4000'
export const API_DICTIONARY_URL = process.env.API_DICTIONARY_URL ?? 'https://api.dictionaryapi.dev/api/v2/entries/en/'

export type Error = {
  code: string
  message: string
  innererror?: any
}

export type Response<T> = {
  success: boolean
  data: T | null
  error?: Error
}

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

export interface NewsHighestViewsDataResponse {
  success: boolean
  data: NewsHighestViewsData[]
}

export interface NewsListDataResponse {
  success: boolean
  data: NewsHighestViewsData[]
  pagination: {
    limit: number
    startPage: number
    totalPages: number
    totalRecords: number
  }
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

export interface NewsHighestViewsData {
  content: string
  day: number
  id: string
  image: string
  title: string
  view: number
}

export interface NewsListData {
  content: string
  day: number
  id: string
  image: string
  title: string
  view: number
}

export interface LearningVideoResponseData {
  success: boolean
  data: LearningVideoData[]
  pagination: {
    startPage: number
    limit: number
    totalPages: number
    totalRecords: number
  }
}

export interface LearningVideoData {
  id: string
  title: string
  image: string
  like: number
  view: number
  day: number
}

export interface VideoDataResponse {
  message: string
  success: boolean
  data: VideoData
}

export interface VideoData {
  CreatedAt: number
  Image: string
  Like: number
  Link: string
  Title: string
  Type: string
  UpdatedAt: number
  View: number
  _id: string
}

export interface SubTitleDataResponse {
  success: boolean
  data: SubTitleData[]
}

export interface SubTitleData {
  day: number
  duration: string
  id: string
  start: number
  text: string
  translate: string
}
