import { CheckOutDataResponse } from '@src/models/api'

export const BASE_URL_CHECKOUT_API = 'https://alepay-v3-sandbox.nganluong.vn/api/v3/checkout'

export const checkoutTest = async (input: {
  tokenKey: string
  orderCode: string
  customMerchantId: string
  amount: number
  currency: string
  orderDescription: string
  totalItem: number
  returnUrl: string
  cancelUrl: string
  buyerName: string
  buyerEmail: string
  buyerPhone: string
  buyerAddress: string
  buyerCity: string
  buyerCountry: string
  paymentHours?: string
  allowDomestic?: boolean
  signature: string
}) => {
  const {
    tokenKey,
    orderCode,
    customMerchantId,
    amount,
    currency,
    orderDescription,
    totalItem,
    returnUrl,
    cancelUrl,
    buyerName,
    buyerEmail,
    buyerPhone,
    buyerAddress,
    buyerCity,
    buyerCountry,
    paymentHours,
    signature,
  } = input

  if (!tokenKey || tokenKey === '') {
    return { success: false, data: null, message: 'Invalid News Id' }
  }

  if (!orderCode || orderCode === '') {
    return { success: false, data: null, message: 'Invalid News Id' }
  }

  if (!customMerchantId || customMerchantId === '') {
    return { success: false, data: null, message: 'Invalid News Id' }
  }

  if (!amount || amount <= 0) {
    return { success: false, data: null, message: 'Invalid News Id' }
  }

  if (!currency || currency === '') {
    return { success: false, data: null, message: 'Invalid News Id' }
  }

  if (!orderDescription || orderDescription === '') {
    return { success: false, data: null, message: 'Invalid News Id' }
  }

  if (!totalItem || totalItem <= 0) {
    return { success: false, data: null, message: 'Invalid News Id' }
  }

  if (!returnUrl || returnUrl === '') {
    return { success: false, data: null, message: 'Invalid News Id' }
  }

  if (!cancelUrl || cancelUrl === '') {
    return { success: false, data: null, message: 'Invalid News Id' }
  }

  if (!buyerName || buyerName === '') {
    return { success: false, data: null, message: 'Invalid News Id' }
  }

  if (!buyerAddress || buyerAddress === '') {
    return { success: false, data: null, message: 'Invalid News Id' }
  }

  if (!buyerEmail || buyerEmail === '') {
    return { success: false, data: null, message: 'Invalid News Id' }
  }

  if (!buyerPhone || buyerPhone === '') {
    return { success: false, data: null, message: 'Invalid News Id' }
  }

  if (!buyerCity || buyerCity === '') {
    return { success: false, data: null, message: 'Invalid News Id' }
  }

  if (!buyerCountry || buyerCountry === '') {
    return { success: false, data: null, message: 'Invalid News Id' }
  }

  if (!signature || signature === '') {
    return { success: false, data: null, message: 'Invalid News Id' }
  }

  try {
    const response = await fetch(`${BASE_URL_CHECKOUT_API}/request-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        buyerAddress,
        buyerCity,
        buyerCountry,
        buyerEmail,
        buyerName,
        buyerPhone,
        cancelUrl,
        currency,
        customMerchantId,
        orderCode,
        orderDescription,
        paymentHours,
        returnUrl,
        tokenKey,
        totalItem,
        signature,
      }),
    })

    const rawResponse = (await response.json()) as CheckOutDataResponse

    return rawResponse
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}
