import { AUTH_TOKEN, USER_INFO } from '@utils/api'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

interface Cookies {
  [name: string]: string
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookies: Cookies = {}
  const { req } = context

  if (req.headers.cookie) {
    req.headers.cookie.split(';').forEach((cookie) => {
      const parts = cookie.split('=')
      cookies[parts[0].trim()] = decodeURIComponent(parts[1].trim())
    })
  }

  if (!!!cookies[USER_INFO] || !!!cookies[AUTH_TOKEN]) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {}, // will be passed to the page component as props
  }
}
