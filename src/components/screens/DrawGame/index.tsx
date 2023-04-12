import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Step1 } from './Step1'
import { Step2Creation } from './Step2Creation'
import { Step2Join } from './Step2Join'
import { Step3 } from './Step3'
import { QUERY_STRING_STEP } from '@src/models/drawGame'

interface Props {
  step: QUERY_STRING_STEP | null
}

export const DrawGameScreen = ({ step }: Props) => {
  const router = useRouter()

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
