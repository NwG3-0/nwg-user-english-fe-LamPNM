import { useRouter } from 'next/router'
import { QUERY_STRING_STEP } from '@src/models/drawGame'

interface ButtonProps {
  label: string
  className?: string
  color?: 'default' | 'green' | 'yellow'
  onClick: () => void
}
const Button = ({ label, className = '', color = 'default', onClick }: ButtonProps) => {
  let baseClassName = ''

  if (color === 'green') {
    baseClassName =
      'min-w-[158px] text-lg focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-8 py-6 mr-2 mb-2'
  } else if (color === 'yellow') {
    baseClassName =
      'min-w-[158px] text-lg focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-8 py-6 mr-2 mb-2'
  } else {
    baseClassName =
      'min-w-[158px] text-lg text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-6 mr-2 mb-2 focus:outline-none '
  }

  return (
    <button type="button" className={`${baseClassName} ${className}`} onClick={onClick}>
      {label}
    </button>
  )
}

export const Step1 = () => {
  const router = useRouter()

  const onButtonClick = ({ type }: { type: 'create' | 'join' | 'playOnline' }) => {
    const queryString = {
      step: QUERY_STRING_STEP.STEP_1,
    }
    if (type === 'create') {
      queryString.step = QUERY_STRING_STEP.STEP_2_CREATION
    } else if (type === 'join') {
      queryString.step = QUERY_STRING_STEP.STEP_2_JOIN
    } else if (type === 'playOnline') {
      queryString.step = QUERY_STRING_STEP.STEP_1
    } else {
      queryString.step = QUERY_STRING_STEP.STEP_3
    }

    void router.push({ pathname: router.pathname, query: queryString }, undefined)
  }

  return (
    <div className="w-full py-[200px]">
      <p className="text-center text-3xl mb-8">Draw Game</p>
      <div className="flex flex-col justify-center items-center gap-y-4">
        <Button label="Create" color="green" onClick={() => onButtonClick({ type: 'create' })} />
        <Button label="Join" color="yellow" onClick={() => onButtonClick({ type: 'join' })} />
        <Button label="Play online" onClick={() => onButtonClick({ type: 'playOnline' })} />
      </div>
    </div>
  )
}
