import dynamic from 'next/dynamic'
import { getServerSideProps } from '@components/common/checkauth'
import { NextPage } from 'next'

const Header = dynamic<any>(() => import('@components/layouts/Header').then((mod) => mod.Header), {
  ssr: false,
})

const WordTest = dynamic(() => import('@components/screens/Examination/WordTest').then((mod) => mod.WordTest), {
  ssr: false,
})

const Footer = dynamic<any>(() => import('@components/layouts/Footer').then((mod) => mod.Footer), {
  ssr: false,
})

const WordTestPage: NextPage = () => {
  return (
    <div>
      <Header />
      <WordTest />
      <Footer />
    </div>
  )
}

export default WordTestPage

export { getServerSideProps }
