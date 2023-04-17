import { TranslateIcon } from '@components/common/CustomIcon'

interface Props {
  text: string
  translate: string
}

export const TranslateModal = ({ text, translate }: Props) => {
  return (
    <div className="flex flex-col gap-[20px]">
      <div>
        <p className="text-[20px] font-[600]">English:</p>
        <p>{text}</p>
      </div>
      <div className="mx-auto w-fit">
        <TranslateIcon width={30} height={30} />
      </div>
      <div>
        <p className="text-[20px] font-[600]">Vietnamese:</p>
        <p>{translate}</p>
      </div>
    </div>
  )
}
