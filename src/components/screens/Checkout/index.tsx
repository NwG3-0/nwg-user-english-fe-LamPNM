import { checkoutTest } from '@utils/api/checkout'
import { getHash } from '@utils/common'

export const Checkout = () => {
  const createLinkCheckOut = async () => {
    try {
      const value = {
        amount: 500000,
        buyerAddress: 'Ha Noi',
        buyerCity: 'Ha Noi',
        buyerCountry: 'VietNam',
        buyerEmail: 'mailam1309@gmail.com',
        buyerName: 'Nguyễn Văn A',
        buyerPhone: '03338899598',
        cancelUrl: 'https://ietls.lampnm.com',
        currency: 'VND',
        customMerchantId: 'mailam1309@gmail.com',
        orderCode: 'ORDER_051500',
        orderDescription: 'This is for order description',
        paymentHours: '48',
        returnUrl: 'https://ietls.lampnm.com',
        tokenKey: 'fuRS4E2NHRvNTObACk1d8dJ9ULe9WT',
        totalItem: 1,
        signature: 'c9c691353dcde326cf6d7cc380845e84a7834e9126e55a1d5cf8ff416cc8f6e1',
      }

      const valueTransaction = {
        tokenKey: 'fuRS4E2NHRvNTObACk1d8dJ9ULe9WT',
        transactionCode: 'ALE00QTPU',
        signature: 'c9c691353dcde326cf6d7cc380845e84a7834e9126e55a1d5cf8ff416cc8f6e1',
      }
      const data = `amount=${value.amount}&buyerAddress=${value.buyerAddress}&buyerCity=${value.buyerCity}&buyerCountry=${value.buyerCountry}&buyerEmail=${value.buyerEmail}&buyerName=${value.buyerName}&buyerPhone=${value.buyerPhone}&cancelUrl=${value.cancelUrl}&currency=${value.currency}&customMerchantId=${value.customMerchantId}&orderCode=${value.orderCode}&orderDescription=${value.orderDescription}&paymentHours=${value.paymentHours}&returnUrl=${value.returnUrl}&tokenKey=${value.tokenKey}&totalItem=${value.totalItem}`

      const key = 'KdUlIJKSX6hiekfhamdUU0LmL2Ew8u'

      const dataTrans = `tokenKey=${valueTransaction.tokenKey}&transactionCode=${valueTransaction.transactionCode}`

      const signature = getHash(key, data)
      const sign = getHash(key, dataTrans)
      console.log(sign)
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
