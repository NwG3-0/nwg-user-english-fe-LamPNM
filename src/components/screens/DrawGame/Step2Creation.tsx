import { useRouter } from 'next/router'

export const Step2Creation = () => {
  const router = useRouter()

  const onBack = () => {
    void router.back()
  }

  return (
    <div className="w-full py-[200px]">
      <button type="button" onClick={onBack}>
        Back
      </button>
      <p className="text-center text-3xl mb-8">Step2</p>
    </div>
  )
}
