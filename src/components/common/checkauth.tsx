import { USER_INFO } from '@src/models/api'
import { hasCookie } from 'cookies-next'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

export const getServerSideProps: GetServerSideProps = async (_context: GetServerSidePropsContext) => {
  if (!hasCookie(USER_INFO)) {
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
