import Skeleton from 'react-loading-skeleton'

interface Props {
  key?: number
}

export const HighestNewsCardSkeleton = ({ key }: Props) => {
  return (
    <div key={key} className="flex flex-col gap-[5px]">
      <Skeleton width={100} height={15} highlightColor="#FFFFFF" borderRadius={0} />
      <Skeleton width={150} height={100} highlightColor="#FFFFFF" borderRadius={0} />
      <Skeleton width={100} height={10} highlightColor="#FFFFFF" borderRadius={0} />
      <div className="w-full">
        <Skeleton
          style={{ width: '150px', height: '8px', marginTop: 10 }}
          highlightColor="#FFFFFF"
          count={2}
          borderRadius={0}
        />
      </div>
    </div>
  )
}
