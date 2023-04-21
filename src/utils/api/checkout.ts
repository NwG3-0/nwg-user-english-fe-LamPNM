import { CheckOutDataResponse, GetTransactionInfoDataResponse } from '@src/models/api'

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
    return { success: false, data: null, message: 'Invalid Token Key' }
  }

  if (!orderCode || orderCode === '') {
    return { success: false, data: null, message: 'Invalid Order Code' }
  }

  if (!customMerchantId || customMerchantId === '') {
    return { success: false, data: null, message: 'Invalid CustomMerchant Id' }
  }

  if (!amount || amount <= 0) {
    return { success: false, data: null, message: 'Invalid Amount' }
  }

  if (!currency || currency === '') {
    return { success: false, data: null, message: 'Invalid Currency' }
  }

  if (!orderDescription || orderDescription === '') {
    return { success: false, data: null, message: 'Invalid Order Description' }
  }

  if (!totalItem || totalItem <= 0) {
    return { success: false, data: null, message: 'Invalid Total Item' }
  }

  if (!returnUrl || returnUrl === '') {
    return { success: false, data: null, message: 'Invalid Return Url' }
  }

  if (!cancelUrl || cancelUrl === '') {
    return { success: false, data: null, message: 'Invalid Cancel Url' }
  }

  if (!buyerName || buyerName === '') {
    return { success: false, data: null, message: 'Invalid Buyer Name' }
  }

  if (!buyerAddress || buyerAddress === '') {
    return { success: false, data: null, message: 'Invalid Buyer Address' }
  }

  if (!buyerEmail || buyerEmail === '') {
    return { success: false, data: null, message: 'Invalid Buyer Email' }
  }

  if (!buyerPhone || buyerPhone === '') {
    return { success: false, data: null, message: 'Invalid Buyer Phone' }
  }

  if (!buyerCity || buyerCity === '') {
    return { success: false, data: null, message: 'Invalid Buyer City' }
  }

  if (!buyerCountry || buyerCountry === '') {
    return { success: false, data: null, message: 'Invalid Buyer Country' }
  }

  if (!signature || signature === '') {
    return { success: false, data: null, message: 'Invalid signature' }
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

export const getTransactionInfo = async (input: { tokenKey: string; transactionCode: string; signature: string }) => {
  try {
    const { tokenKey, transactionCode, signature } = input

    if (!tokenKey || tokenKey === '') {
      return { success: false, data: null, message: 'Invalid Token Key' }
    }

    if (!transactionCode || transactionCode === '') {
      return { success: false, data: null, message: 'Invalid Token Key' }
    }

    if (!signature || signature === '') {
      return { success: false, data: null, message: 'Invalid Token Key' }
    }

    const response = await fetch(`${BASE_URL_CHECKOUT_API}/get-transaction-info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tokenKey,
        transactionCode,
        signature,
      }),
    })

    const rawResponse = (await response.json()) as GetTransactionInfoDataResponse

    return rawResponse
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}
