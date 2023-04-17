import {
  API_DICTIONARY_URL,
  AUTH_TOKEN,
  EarliestPostResponse,
  LearningVideoResponseData,
  NewsDetailResponse,
  NewsHighestViewsDataResponse,
  NewsListDataResponse,
  PostDetailResponse,
  SubTitleDataResponse,
  USER_INFO,
  VideoDataResponse,
} from '@src/models/api'
import { DEVICES } from './common'

export const API_BASE_URL = process.env.API_BASE_URL ?? 'https://englishbeielts.lampnm.com'

export const isLogin = () => {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem(USER_INFO) && !!localStorage.getItem(AUTH_TOKEN)
  } else {
    return false
  }
}

export const login = async ({ email, password }: { email: string; password: string }) => {
  try {
    if (email === '') {
      return { success: false, data: null, message: 'Please enter your email' }
    }
    if (password === '') {
      return { success: false, data: null, message: 'Please enter your password' }
    }

    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}

export const register = async ({
  email,
  hobbies,
  password,
}: {
  email: string
  hobbies: string[]
  password: string
}) => {
  try {
    if (email === '') {
      return { success: false, data: null, message: 'Please enter your email' }
    }

    if (password === '') {
      return { success: false, data: null, message: 'Please enter your password' }
    }

    if (hobbies.length < 3) {
      return { success: false, data: null, message: 'Your hobbies must be 3' }
    }

    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, hobbies }),
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}

export const verify = async ({ email, otpCode }: { email: string; otpCode: string }) => {
  try {
    if (otpCode === '') {
      return { success: false, data: null, message: 'Please enter your OTP Code' }
    }

    const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otpCode }),
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}

export const logout = async (input: { token: string; expiredAt: number }) => {
  try {
    const { token, expiredAt } = input

    if (!token) {
      return { success: false, data: null, message: 'Please enter your OTP Code' }
    }

    if (!expiredAt) {
      return { success: false, data: null, message: 'Please enter your OTP Code' }
    }

    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, expiredAt }),
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}

export const getPostList = async (input: { limit: number; page: number; keyword: string }) => {
  try {
    const limit = input.limit ?? 10
    const page = input.page ?? 1
    const keyword = input.keyword ?? ''

    const response = await fetch(
      `${API_BASE_URL}/api/post?limit=${limit}&page=${page}&keyword=${keyword}&device=${DEVICES.WEB}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}

//Dictionary
export const getDictionary = async (searchWord: string) => {
  try {
    const response = await fetch(`${API_DICTIONARY_URL}${searchWord}`, {
      method: 'GET',
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
    // return response.json()
  } catch (error) {
    return []
  }
}

//Topic
export const getDeckList = async (userId: string, accessToken: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/topic-deck?userId=${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}

export const createDeck = async (input: { topicName: string; userId: string; accessToken: string }) => {
  try {
    const { topicName, userId, accessToken } = input

    if (!topicName || topicName === '') {
      return { success: false, data: null, message: 'Please enter your title' }
    }

    const response = await fetch(`${API_BASE_URL}/api/topic-deck/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ topicName, userId }),
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}

export const deleteDeck = async (topicId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/topic-deck/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topicId }),
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      console.log(JSON.stringify({ topicId }))
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}

//Card
export const getCard = async (input: {
  limit: number
  page: number
  keyword: string
  level: string
  topicName: string
}) => {
  try {
    if (!input.topicName) {
      return { success: false, data: null, message: 'Please enter Topic Name' }
    }
    const limit = input.limit ?? 10
    const page = input.page ?? 1
    const keyword = input.keyword ?? ''
    const level = input.level ?? 'easy,normal,hard'
    const topicName = input.topicName

    const response = await fetch(
      `${API_BASE_URL}/api/card?limit=${limit}&page=${page}&keyword=${keyword}&level=${level}&topicName=${topicName}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}

export const checkCard = async (input: { word: string; userId: string }) => {
  try {
    const word = input.word
    const userId = input.userId

    const response = await fetch(`${API_BASE_URL}/api/card/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word, userId }),
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went ' }
  }
}

export const createCard = async (input: {
  topicName: string
  word: string
  phonetic: string
  audio: string
  meanings: string
  level: string
  userId: string
  accessToken: string
}) => {
  try {
    const { topicName, word, phonetic, audio, meanings, userId, level, accessToken } = input

    if (!topicName || topicName === '') {
      return { success: false, data: null, message: 'Please enter your title' }
    }

    if (!word || word === '') {
      return { success: false, data: null, message: 'Please enter your word' }
    }

    if (!phonetic || phonetic === '') {
      return { success: false, data: null, message: 'Please enter your phonetic' }
    }

    if (!audio || audio === '') {
      return { success: false, data: null, message: 'Please enter your audio' }
    }

    if (!meanings || meanings === '') {
      return { success: false, data: null, message: 'Please enter your meanings' }
    }

    if (!userId || userId === '') {
      return { success: false, data: null, message: 'Please enter your userId' }
    }

    if (!level || level === '') {
      return { success: false, data: null, message: 'Please enter your level' }
    }

    if (!accessToken || accessToken === '') {
      return { success: false, data: null, message: 'Please enter your accessToken' }
    }

    const response = await fetch(`${API_BASE_URL}/api/card/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ topicName, word, phonetic, audio, meanings, userId, level }),
    })

    const rawResponse = await response.json()
    console.log(response)
    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}

export const sendMessage = async (input: { from: string; to: string; message: string; type: string }) => {
  try {
    const { from, to, message, type } = input
    const response = await fetch(`${API_BASE_URL}/api/message/send-msg`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to, message, type }),
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}

export const receiveMessage = async (input: { from: string; to: string; page: number }) => {
  try {
    const { from, to, page } = input
    if (!from) {
      return { success: false, data: null, message: 'Do not let the user info send empty' }
    }

    if (!to) {
      return { success: false, data: null, message: 'Do not let the user info receive empty' }
    }

    const response = await fetch(`${API_BASE_URL}/api/message/received-msg`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to, page, limit: 100 }),
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}

//Word Test
export const randomWord = async (userId: string, accessToken: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/random?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}

export const setUpRandomWord = async (input: {
  number: number
  isActivated: boolean
  userId: string
  topicName: string
  level: string
}) => {
  try {
    const { number, isActivated, userId, topicName, level } = input

    if (topicName === '') {
      return { success: false, data: null, message: 'Please enter your email' }
    }

    const response = await fetch(`${API_BASE_URL}/api/setup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ number, isActivated, userId, topicName, level }),
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}

export const UpdateSetUpRandomWord = async (input: {
  number: number
  userId: string
  topicName: string
  level: string
}) => {
  try {
    const { number, userId, topicName, level } = input

    if (topicName === '') {
      return { success: false, data: null, message: 'Please enter your email' }
    }
    const response = await fetch(`${API_BASE_URL}/api/update-setup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ number, userId, topicName, level }),
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}

export const checkUserId = async (userId: string, accessToken: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/check-random/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}

//Word test result
export const addResultWordTest = async (input: {
  resultTest: string
  topicName: string
  userId: string
  accessToken: string
}) => {
  try {
    const { resultTest, topicName, userId, accessToken } = input

    if (!topicName || topicName === '') {
      return { success: false, data: null, message: 'Please enter your title' }
    }
    if (!topicName || topicName === '') {
      return { success: false, data: null, message: 'Please enter your title' }
    }
    const response = await fetch(`${API_BASE_URL}/api/result-test/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ resultTest, topicName, userId }),
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}

export const addSpeakingTopic = async (input: {
  question: string
  expiredTime: number
  topicName: string
  accessToken: string
}) => {
  try {
    const { question, expiredTime, topicName, accessToken } = input

    if (!question) {
      return { success: false, data: null, message: 'Invalid question' }
    }

    if (!expiredTime) {
      return { success: false, data: null, message: 'Invalid expired time' }
    }

    if (!topicName) {
      return { success: false, data: null, message: 'Invalid topic name' }
    }

    if (!accessToken) {
      return { success: false, data: null, message: 'Invalid Access Token' }
    }

    const response = await fetch(`${API_BASE_URL}/api/speaking/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ question, expiredTime, topicName }),
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}

export const addResultSkill = async (input: {
  result: string
  topic: string
  user_id: string
  skill: string
  accessToken: string
}) => {
  try {
    const { result, topic, user_id, skill, accessToken } = input

    if (!result) {
      return { success: false, data: null, message: 'Invalid results' }
    }

    if (!topic) {
      return { success: false, data: null, message: 'Invalid Topic' }
    }

    if (!user_id) {
      return { success: false, data: null, message: 'Invalid User Id' }
    }

    if (!skill) {
      return { success: false, data: null, message: 'Invalid Skill' }
    }

    if (!accessToken) {
      return { success: false, data: null, message: 'Invalid Access Token' }
    }

    const response = await fetch(`${API_BASE_URL}/api/speaking/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ result, topic, user_id, skill }),
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}

export const addSpeakingFile = async (input: {
  result: string
  topic: string
  user_id: string
  skill: string
  accessToken: string
}) => {
  try {
    const { result, topic, user_id, skill, accessToken } = input

    if (!result) {
      return { success: false, data: null, message: 'Invalid Result' }
    }

    if (!topic) {
      return { success: false, data: null, message: 'Invalid Topic' }
    }

    if (!user_id) {
      return { success: false, data: null, message: 'Invalid User Id' }
    }

    if (!skill) {
      return { success: false, data: null, message: 'Invalid Skill' }
    }

    if (!accessToken) {
      return { success: false, data: null, message: 'Invalid Access Token' }
    }

    const response = await fetch(`${API_BASE_URL}/api/result-skill/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ result, topic, user_id, skill }),
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}

export const getEarliestPost = async (userId: string, accessToken: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/earliest-post?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const rawResponse = (await response.json()) as EarliestPostResponse

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}

export const getNewsList = async (input: {
  limit: number
  page: number
  keyword: string
  startDate: number
  endDate: number
}) => {
  try {
    const limit = input.limit ?? 10
    const page = input.page ?? 1
    const keyword = input.keyword ?? ''
    const startDate = input.startDate
    const endDate = input.endDate

    const response = await fetch(
      `${API_BASE_URL}/api/news?limit=${limit}&page=${page}&keyword=${keyword}&device=${DEVICES.MOBILE}&startDate=${startDate}&endDate=${endDate}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const rawResponse = (await response.json()) as NewsListDataResponse

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}

export const getPostDetail = async (input: { post_id: string }) => {
  try {
    const { post_id } = input

    if (!post_id || post_id === '') {
      return { success: false, data: null, message: 'Invalid Post Id' }
    }

    const response = await fetch(`${API_BASE_URL}/api/post/detail?post_id=${post_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const rawResponse = (await response.json()) as PostDetailResponse

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}

export const getNewsDetail = async (input: { news_id: string }) => {
  try {
    const { news_id } = input

    if (!news_id || news_id === '') {
      return { success: false, data: null, message: 'Invalid Post Id' }
    }

    const response = await fetch(`${API_BASE_URL}/api/news/detail?news_id=${news_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const rawResponse = (await response.json()) as NewsDetailResponse

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}

export const checkViewNews = async (input: { newsId: string; userId: string; accessToken: string }) => {
  try {
    const { newsId, userId, accessToken } = input

    if (!newsId || newsId === '') {
      return { success: false, data: null, message: 'Invalid News Id' }
    }

    if (!userId || userId === '') {
      return { success: false, data: null, message: 'Invalid Post Id' }
    }

    if (!accessToken || accessToken === '') {
      return { success: false, data: null, message: 'Invalid Post Id' }
    }

    const response = await fetch(`${API_BASE_URL}/api/news/check-views?newsId=${newsId}&userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}

export const addViewNews = async (input: { newsId: string; userId: string; accessToken: string }) => {
  try {
    const { newsId, userId, accessToken } = input

    if (!newsId || newsId === '') {
      return { success: false, data: null, message: 'Invalid News Id' }
    }

    if (!userId || userId === '') {
      return { success: false, data: null, message: 'Invalid User Id' }
    }

    if (!accessToken || accessToken === '') {
      return { success: false, data: null, message: 'Invalid access token' }
    }

    const response = await fetch(`${API_BASE_URL}/api/view-news/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ newsId, userId }),
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}

export const updateViewNews = async (input: { newsId: string; accessToken: string }) => {
  try {
    const { newsId, accessToken } = input

    if (!newsId || newsId === '') {
      return { success: false, data: null, message: 'Invalid News Id' }
    }

    if (!accessToken || accessToken === '') {
      return { success: false, data: null, message: 'Invalid access token' }
    }

    const response = await fetch(`${API_BASE_URL}/api/news/update-views`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ newsId }),
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}

export const getHighestNewsList = async (input: { limit: number }) => {
  try {
    const { limit } = input

    const response = await fetch(`${API_BASE_URL}/api/news/highest-views?device=${DEVICES.WEB}&limit=${limit ?? 5}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const rawResponse = (await response.json()) as NewsHighestViewsDataResponse

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {}
}

export const getNewsListByType = async (input: { limit: number; page: number; keyword: string; type: string }) => {
  try {
    const limit = input.limit ?? 10
    const page = input.page ?? 1
    const keyword = input.keyword ?? ''
    const type = input.type

    const response = await fetch(
      `${API_BASE_URL}/api/news-type?limit=${limit}&page=${page}&keyword=${keyword}&device=${DEVICES.MOBILE}&type=${type}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const rawResponse = (await response.json()) as NewsListDataResponse

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}

export const getLearningVideoList = async (input: { limit: number; page: number }) => {
  try {
    const { limit, page } = input

    const response = await fetch(`${API_BASE_URL}/api/learning-video?limit=${limit ?? 5}&page=${page ?? 1}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const rawResponse = (await response.json()) as LearningVideoResponseData

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}

export const getLearningVideoDetail = async (input: { video_id: string; accessToken: string }) => {
  try {
    const { video_id, accessToken } = input

    const response = await fetch(`${API_BASE_URL}/api/learning-video-detail?learning_video_id=${video_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const rawResponse = (await response.json()) as VideoDataResponse

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}

export const getSubTitleDetail = async (input: { learning_video_id: string; accessToken: string }) => {
  try {
    const { learning_video_id, accessToken } = input

    const response = await fetch(`${API_BASE_URL}/api/subtitle?learning_video_id=${learning_video_id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const rawResponse = (await response.json()) as SubTitleDataResponse

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}
