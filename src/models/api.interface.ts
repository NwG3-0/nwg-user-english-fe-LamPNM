export interface UserInfoDataResponse {
  success: boolean
  data: UserInfoData
}

export interface UserInfoData {
  email: string
  id: string
  token: string
}

export interface UserLogOutResponse {
  success: boolean
  data: null
  message: string
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

export interface SubTitleRandomDataResponse {
  success: boolean
  data: SubTitleRandomData[]
}

export interface SubTitleData {
  day: number
  duration: string
  id: string
  start: number
  text: string
  translate: string
}

export interface SubTitleRandomData {
  day: number
  duration: string
  id: string
  start: number
  word: string
  text: string
  translate: string
}

export interface DeckListDataResponse {
  success: true
  data: DeckListData[]
  message: null
}

export interface DeckListData {
  id: string
  topicName: string
  userId: string
  day: number
}

export interface CardDataResponse {
  success: boolean
  data: CardData[]
  pagination: { startPage: number; limit: number; totalPages: number; totalRecords: number }
}

export interface CardData {
  id: string
  word: string
  phonetic: string
  audio: string
  meanings: string
  topicName: string
  level: string
  day: number
}

export interface RandomWordDataResponse {
  success: boolean
  data: RandomWordData[]
  exp: number
}

export interface RandomWordData {
  _id: string
  Audio: string
  CreatedAt: 1680444840
  Level: string
  Meanings: string
  Phonetic: string
  TopicName: string
  UpdatedAt: number
  UserId: string
  Word: string
}

export interface CheckOutDataResponse {
  code: string
  message: string
  checkoutUrl: string
  transactionCode: string
  signature: string
}

export interface GetTransactionInfoDataResponse {
  code: string
  message: string
  signature: string
  transactionCode: string
  orderCode: string
  amount: string
  currency: string
  buyerEmail: string
  buyerPhone: string
  cardNumber: string
  buyerName: string
  status: string
  reason: string
  description: string
  installment: boolean
  is3D: boolean
  month: number
  bankCode: string
  bankName: string
  method: string
  bankType: string
  transactionTime: number
  successTime: number
  bankHotline: string
  merchantFee: number
  payerFee: number
  authenCode: string | null
}
