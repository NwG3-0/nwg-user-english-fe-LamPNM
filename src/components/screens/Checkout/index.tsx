import { checkoutTest } from '@utils/api/checkout'
import { getHash } from '@utils/common'

export const Checkout = () => {
  const createLinkCheckOut = async () => {
    try {
      const value = {
        tokenKey: 'uRS4E2NHRvNTObACk1d8dJ9ULe9WT',
        orderCode: 'ORDER_051500',
        customMerchantId: 'mailam1309@gmail.com',
        amount: 500000,
        currency: 'VND',
        orderDescription: 'This is for order description',
        totalItem: 1,
        returnUrl: 'http://test/return',
        cancelUrl: 'http://test/cancel',
        buyerName: 'Nguyễn Văn A',
        buyerEmail: 'mailam1309@gmail.com',
        buyerPhone: '03338899598',
        buyerAddress: 'Ha Noi',
        buyerCity: 'Ha Noi',
        buyerCountry: 'VietNam',
        paymentHours: '48',
      }

      const data = `amount=${value.amount}&buyerAddress=${value.buyerAddress}&buyerCity=${value.buyerCity}&buyerCountry=${value.buyerCountry}&buyerEmail=${value.buyerEmail}&buyerName=${value.buyerName}&buyerPhone=${value.buyerPhone}&cancel
Url=${value.cancelUrl}&currency=${value.currency}&customMerchantId=${value.customMerchantId}&orderCode=${value.orderCode}&orderDescription=${value.orderDescription}&returnUrl=${value.returnUrl}&tokenKey=${value.tokenKey}&totalItem=${value.totalItem}`

      const key = 'KdUlIJKSX6hiekfhamdUU0LmL2Ew8u'

      const signature = getHash(data, key)
      const response = await checkoutTest({ ...value, signature })

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mt-[100px] pb-[50px]">
      <p className="text-center text-[32px] font-semibold">Become a vip member of Nwg English</p>
      <p className="text-center text-[24px] font-semibold">
        Chỉ với 500.000 vnd bạn có thể sử dụng tất cả tính năng của website trọn đời
      </p>
      <p className="text-center">Vui lòng nhập thông tin</p>
      <div className="flex container items-center justify-between md:w-[1100px] mx-auto mt-[20px]">
        <button onClick={createLinkCheckOut}>Create</button>
      </div>
    </div>
  )
}
