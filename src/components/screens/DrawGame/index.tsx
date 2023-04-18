import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Step1 } from './Step1'
import { QUERY_STRING_STEP } from '@src/models/drawGame'
import * as io from 'socket.io-client'
import { useDataLoginInfoStore } from '@src/zustand'
import { DataLoginInfo } from '@utils/zustand'

export const socket = io.connect('http://localhost:4000')

const Step2Creation = dynamic(() => import('./Step2Creation').then((mod) => mod.Step2Creation))
const Step2Join = dynamic(() => import('./Step2Join').then((mod) => mod.Step2Join))
const Step3 = dynamic(() => import('./Step3').then((mod) => mod.Step3), { ssr: false })

interface Props {
  step: QUERY_STRING_STEP | null
}

export const DrawGameScreen = ({ step }: Props) => {
  const router = useRouter()
  const [userInfo] = useDataLoginInfoStore((state: DataLoginInfo) => [state.userInfo])

  useEffect(() => {
    if (userInfo) {
      socket.emit('users', userInfo.id)
    }
  }, [userInfo])

  useEffect(() => {
    if (!step) {
      void router.replace({ pathname: router.pathname, query: { step: QUERY_STRING_STEP.STEP_1 } }, undefined, {
        shallow: true,
      })
    }
  }, [])

  if (!step || step === QUERY_STRING_STEP.STEP_1) {
    return <Step1 />
  }

  if (step === QUERY_STRING_STEP.STEP_2_CREATION) {
    return <Step2Creation />
  }

  if (step === QUERY_STRING_STEP.STEP_2_JOIN) {
    return <Step2Join />
  }

  return <Step3 />
}
