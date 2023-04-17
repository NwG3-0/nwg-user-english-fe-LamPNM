import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const Header = dynamic<any>(() => import('@components/layouts/Header').then((mod) => mod.Header), {
  ssr: false,
})

const Checkout = dynamic<any>(() => import('@components/screens/Checkout/index').then((mod) => mod.Checkout), {
  ssr: false,
})

const Footer = dynamic<any>(() => import('@components/layouts/Footer').then((mod) => mod.Footer), {
  ssr: false,
})

const CheckoutPage: NextPage = () => {
  return (
    <div>
      <Header />
      <Checkout />
      <Footer />
    </div>
  )
}

export default CheckoutPage
