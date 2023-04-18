import { NextApiRequest, NextApiResponse } from 'next'
import LRU from 'lru-cache'
import superjson from 'superjson'
import { getDictionary } from '@utils/api'

const CACHE_PREFIX = 'WORD'
const CACHE_DURATION_IN_SECOND = 60 * 60 // 1 hours in second
const DEFAULT_MAX_CACHED_ITEMS = 100

const options = {
  max: Number(process.env.MAX_CACHED_NFT_DETAIL || DEFAULT_MAX_CACHED_ITEMS),
}

const cache = new LRU(options)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { searchWord } = req.query as { searchWord: string }
      if (!searchWord) {
        return res.status(400).json({ success: false, data: null, message: 'Invalid Sneaker ID' })
      }
      const cacheKey = `${CACHE_PREFIX}_${searchWord}`
      const cachedResponse = cache.get(cacheKey) as string

      if (cachedResponse) {
        res.setHeader('Cache-Control', `s-maxage=${CACHE_DURATION_IN_SECOND}, stale-while-revalidate`)
        res.status(200).json({
          success: true,
          data: superjson.parse(cachedResponse),
        })
      } else {
        const response = await getDictionary(searchWord)

        if (response.length > 0) {
          cache.set(cacheKey, superjson.stringify(response[0]))
          res.setHeader('Cache-Control', `s-maxage=${CACHE_DURATION_IN_SECOND}, stale-while-revalidate`)
          res.status(200).json({
            success: true,
            data: response[0],
          })
        } else {
          res.statusCode = 400
          res.json({
            success: false,
            response: null,
            message: 'Invalid word',
          })
        }
      }
    } catch (error: unknown) {
      console.error('[get-sneaker-detail]', error)
      res.status(400).json({ success: false, message: (error as Error).message })
    }
  } else {
    res.status(400).json({ success: false, message: 'Invalid method. GET only.' })
  }
}
