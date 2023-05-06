import Skeleton from 'react-loading-skeleton'

interface Props {
  key?: number
  position: 'left' | 'right'
}

export const NewsCardSkeleton = ({ position, key }: Props) => {
  return (
    <div
      key={key}
      className={`flex overflow-hidden gap-[20px] group hover:text-[#808080] max-lg:flex-col flex-wrap ${
        position === 'right' && 'flex-row-reverse'
      }`}
    >
      <div className="flex-1 lg:w-[50%] h-[400px]">
        <Skeleton style={{ width: '100%', height: '100%' }} highlightColor="#FFFFFF" />
      </div>
      <div className={`flex-1 ${position === 'right' && 'flex flex-col lg:items-end lg:text-right'}`}>
        <Skeleton width={100} height={15} highlightColor="#FFFFFF" borderRadius={0} />
        <div className="w-full py-[4px]">
          <Skeleton
            style={{ width: '100%', height: '30px', marginTop: 10 }}
            count={2}
            highlightColor="#FFFFFF"
            borderRadius={0}
          />
        </div>
        <div className="py-[10px]">
          <Skeleton width={100} height={10} highlightColor="#FFFFFF" borderRadius={0} />
        </div>
        <div className="w-full mt-[8px]">
          <Skeleton
            style={{ width: '100%', height: '8px', marginTop: 10 }}
            highlightColor="#FFFFFF"
            count={6}
            borderRadius={0}
          />
        </div>
      </div>
    </div>
  )
}
