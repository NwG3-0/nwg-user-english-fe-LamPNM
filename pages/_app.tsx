import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-quill/dist/quill.snow.css'
import jwtDecode from 'jwt-decode'
import '../styles/globals.css'
import 'slick-carousel/slick/slick.css'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import 'slick-carousel/slick/slick-theme.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { isLogin } from '@utils/api'
import { AUTH_TOKEN, USER_INFO } from '@src/models/api'
import AOS from 'aos'
import Head from 'next/head'
import 'aos/dist/aos.css'
import { useDataLoginInfoStore } from '@src/zustand'
import { safeParseJSON } from '@utils/json'

dayjs.extend(utc)

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  const [authToken, setAuthToken] = useState<any>({})
  const [setUserInfo, setAccessToken] = useDataLoginInfoStore((state: any) => [state.setUserInfo, state.setAccessToken])

  useEffect(() => {
    if (isLogin() && typeof window !== 'undefined') {
      setAuthToken(jwtDecode(localStorage.getItem(AUTH_TOKEN) || ''))
      setUserInfo(safeParseJSON(localStorage.getItem(USER_INFO) ?? '{}'))
      setAccessToken(localStorage.getItem(AUTH_TOKEN) || '')
    }
  }, [])

  useEffect(() => {
    if (authToken && dayjs.utc(authToken?.exp).isBefore(dayjs.utc().unix())) {
      localStorage.removeItem(AUTH_TOKEN)
      localStorage.removeItem(USER_INFO)
    }
  }, [authToken])

  useEffect(() => {
    AOS.init({
      once: false,
    })
  }, [])

  return (
    <>
      <Head>
        <meta
          name="viewport"
          // eslint-disable-next-line max-len
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ToastContainer />
      </QueryClientProvider>
    </>
  )
}

export default MyApp
