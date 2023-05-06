import 'aos/dist/aos.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-quill/dist/quill.snow.css'
import '../styles/globals.css'
import 'slick-carousel/slick/slick.css'
import 'react-loading-skeleton/dist/skeleton.css'

import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import AOS from 'aos'
import type { AppProps } from 'next/app'
import jwtDecode from 'jwt-decode'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AUTH_TOKEN, USER_INFO, isLogin } from '@utils/api'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useDataLoginInfoStore } from '@src/zustand'
import { safeParseJSON } from '@utils/json'
import { AuthToken } from '@utils/common'
import { getCookie, removeCookies } from 'cookies-next'

dayjs.extend(utc)

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  const [authToken, setAuthToken] = useState<AuthToken>({
    email: '',
    exp: 0,
    iat: 0,
    manager_id: '',
    role: 1,
  })
  const [setUserInfo, setAccessToken] = useDataLoginInfoStore((state: any) => [state.setUserInfo, state.setAccessToken])

  useEffect(() => {
    if (isLogin() && typeof window !== 'undefined') {
      setAuthToken(jwtDecode(String(getCookie(AUTH_TOKEN)) || '{}'))
      setUserInfo(safeParseJSON(String(getCookie(USER_INFO)) ?? '{}'))
      setAccessToken(String(getCookie(AUTH_TOKEN)) || '')
    }
  }, [])

  useEffect(() => {
    if (authToken && authToken.email !== '' && dayjs.utc(authToken?.exp).isBefore(dayjs.utc().unix())) {
      localStorage.removeItem(AUTH_TOKEN)
      localStorage.removeItem(USER_INFO)
      removeCookies(AUTH_TOKEN)
      removeCookies(USER_INFO)
    }
  }, [authToken])

  useEffect(() => {
    AOS.init({
      once: false,
    })
  }, [])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ToastContainer />
      </QueryClientProvider>
    </>
  )
}

export default MyApp
