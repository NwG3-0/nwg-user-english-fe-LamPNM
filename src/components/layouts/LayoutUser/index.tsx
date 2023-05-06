import { ReactElement } from 'react'
import { HeaderUser } from '../HeaderUser'
import { Footer } from '../Footer'
import { MenuWeb } from '../MenuWeb'
import Head from 'next/head'

interface Props {
  title: string
  isLoading: boolean
  skeletonLoading: ReactElement
  children: ReactElement
}

export const LayoutUser = ({ title, children, isLoading, skeletonLoading }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <HeaderUser />
      <MenuWeb />
      {isLoading ? skeletonLoading : children}
      <Footer />
    </>
  )
}
