import { Response } from '@src/models/api'

// TODO: update type & data
export const fetchListRoom = async (): Promise<Response<any>> => {
  // try {
  //   const response = await fetch('/')
  //   const rawResponse = await response.json()
  //   if (response.ok) {
  //     if (rawResponse.success) {
  //       return { success: true, data: rawResponse.data }
  //     }

  //     return { success: false, data: null, error: rawResponse.error }
  //   }

  //   return { success: false, data: null, error: rawResponse }
  // } catch (error: any) {
  //   console.error('[fetchListRoom]', error)
  //   return { success: false, data: null, error }
  // }
  const data: { id: string; name: string }[] = [
    { id: 'zsxdf234sdf', name: 'room1' },
    { id: '234234sdfsdf', name: 'room2' },
  ]
  return { success: true, data }
}
