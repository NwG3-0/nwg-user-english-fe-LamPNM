import { API_DICTIONARY_URL, AUTH_TOKEN, EarliestPostResponse, USER_INFO } from '@src/models/api'

export const API_BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:4000'

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

export const register = async ({ email, password }: { email: string; password: string }) => {
  try {
    if (email === '') {
      return { success: false, data: null, message: 'Please enter your email' }
    }
    if (password === '') {
      return { success: false, data: null, message: 'Please enter your password' }
    }

    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
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

export const logout = async (accessToken: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken }),
    })

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}

export const createPost = async (input: {
  title: string
  imageTitle: string
  description: string
  accessToken: string
}) => {
  try {
    const { title, imageTitle, description, accessToken } = input

    if (!title || title === '') {
      return { success: false, data: null, message: 'Please enter your title' }
    }

    if (!imageTitle || imageTitle === '') {
      return { success: false, data: null, message: 'Please enter your image title' }
    }

    if (!description || description === '') {
      return { success: false, data: null, message: 'Please enter your description' }
    }

    if (!accessToken) {
      return { success: false, data: null, message: 'Access Token is invalid' }
    }

    const response = await fetch(`${API_BASE_URL}/api/post/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ title, imageTitle, description }),
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

    const response = await fetch(`${API_BASE_URL}/api/post?limit=${limit}&page=${page}&keyword=${keyword}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
export const getDeckList = async (userId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/topic-deck?userId=${userId}`, {
      method: 'GET',
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

    const response = await fetch(`${API_BASE_URL}/api/card/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ topicName, word, phonetic, audio, meanings, userId, level }),
    })

    const rawResponse = await response.json()

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
  resultExam: string
  topicName: string
  userId: string
  accessToken: string
}) => {
  try {
    const { resultExam, topicName, userId, accessToken } = input

    if (!topicName || topicName === '') {
      return { success: false, data: null, message: 'Please enter your title' }
    }
    if (!topicName || topicName === '') {
      return { success: false, data: null, message: 'Please enter your title' }
    }
    const response = await fetch(`${API_BASE_URL}/api/result-exam/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ resultExam, topicName, userId }),
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
