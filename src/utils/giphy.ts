export const GIPHY_URL = 'https://media'

const API_KEY_GIPHY = process.env.API_KEY_GIPHY ?? '3PXODUnuDCPn5XRe5xbUemJZRfXjwNlf'
const API_GIPHY_GIF_URL = process.env.API_GIPHY_GIF ?? 'https://api.giphy.com/v1/gifs'
const API_GIPHY_STICKER_URL = process.env.API_GIPHY_STICKER ?? 'https://api.giphy.com/v1/stickers'
const API_GIPHY_GIF_TREND_URL = process.env.API_GIPHY_GIF_TRENDING ?? 'https://api.giphy.com/v1/gifs/trending'
const API_GIPHY_STICKER_TREND_URL =
  process.env.API_GIPHY_STICKER_TRENDING ?? 'https://api.giphy.com/v1/stickers/trending'

export const getGiphyGif = async ({ keyword, limit, offset }: { keyword: string; limit: number; offset: number }) => {
  try {
    if (keyword === '') {
      return { success: false, data: null, message: 'Invalid keyword' }
    }

    const limitInput = limit ?? 25
    const offsetInput = offset ?? 0

    const response = await fetch(
      `${API_GIPHY_GIF_URL}/search?api_key=${API_KEY_GIPHY}&q=${keyword}&limit=${limitInput}&offset=${offsetInput}&rating=g&lang=en`,
      {
        method: 'GET',
      },
    )

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}

export const getGiphyGifTrend = async ({ limit, offset }: { limit: number; offset: number }) => {
  try {
    const limitInput = limit ?? 25

    const response = await fetch(
      `${API_GIPHY_GIF_TREND_URL}?api_key=${API_KEY_GIPHY}&limit=${limitInput}&offset=${offset}&rating=g`,
      {
        method: 'GET',
      },
    )

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}

export const getGiphySticker = async ({
  keyword,
  limit,
  offset,
}: {
  keyword: string
  limit: number
  offset: number
}) => {
  try {
    if (keyword === '') {
      return { success: false, data: null, message: 'Invalid keyword' }
    }

    const limitInput = limit ?? 25
    const offsetInput = offset ?? 0

    const response = await fetch(
      `${API_GIPHY_STICKER_URL}/search?api_key=${API_KEY_GIPHY}&q=${keyword}&limit=${limitInput}&offset=${offsetInput}&rating=g&lang=en`,
      {
        method: 'GET',
      },
    )

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}

export const getGiphyStickerTrend = async ({ limit, offset }: { limit: number; offset: number }) => {
  try {
    const limitInput = limit ?? 25

    const response = await fetch(
      `${API_GIPHY_STICKER_TREND_URL}?api_key=${API_KEY_GIPHY}&offset=${offset}&limit=${limitInput}&rating=g`,
      {
        method: 'GET',
      },
    )

    const rawResponse = await response.json()

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}
