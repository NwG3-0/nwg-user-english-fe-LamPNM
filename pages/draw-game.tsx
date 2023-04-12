import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { DrawGameScreen } from '@components/screens/DrawGame'
import { QUERY_STRING_STEP } from '@src/models/drawGame'

export default function DrawGame({ step }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <DrawGameScreen step={step} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{ step: QUERY_STRING_STEP | null }> = async (
  context: GetServerSidePropsContext,
) => {
  const step = (context.query.step as QUERY_STRING_STEP) ?? null
  return {
    props: {
      step,
    },
  }
}
