import type { NextPage } from 'next'
import { Header } from '@components/layouts/Header'
import { Banner } from '@components/layouts/Banner'
import { Footer } from '@components/layouts/Footer'
import { VideoDetail } from '@components/screens/VideoDetail'

const VideoDetailPage: NextPage = () => {
  return (
    <>
      <Header />
      <Banner path="/images/background-home.webp" />
      <VideoDetail />
      <Footer />
    </>
  )
}

export default VideoDetailPage
