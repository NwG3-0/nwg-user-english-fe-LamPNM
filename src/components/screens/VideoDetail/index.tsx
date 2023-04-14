import { useDataLoginInfoStore } from '@src/zustand'
import { useQuery } from '@tanstack/react-query'
import { getSubTitleDetail } from '@utils/api'
import { QUERY_KEYS } from '@utils/keys'
import { DataLoginInfo } from '@utils/zustand'
import { useRouter } from 'next/router'

export const VideoDetail = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }
  const [accessToken] = useDataLoginInfoStore((state: DataLoginInfo) => [state.accessToken])

  const { data } = useQuery(
    [QUERY_KEYS.VIDEO_DETAIL, accessToken, id],
    async () => {
      if (accessToken) {
        try {
          const response = await getSubTitleDetail({ learning_video_id: id, accessToken })

          return response
        } catch (error) {
          console.log(error)
        }
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: !!accessToken && !!id,
    },
  )

  console.log(data)
  return (
    <div>
      <div></div>
    </div>
  )
}
