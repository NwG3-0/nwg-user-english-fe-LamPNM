import { HighestNewsCardSkeleton } from './HighestNewsCardSkeleton'
import { NewsCardSkeleton } from './NewsCardSkeleton'
import Skeleton from 'react-loading-skeleton'

export const SkeletonLoadingNewsPage = () => {
  return (
    <div className="container xl:w-[1300px] mx-auto mt-[110px]">
      <div className="w-full flex gap-[20px]">
        <div className="flex-1">
          <div className="cursor-pointer flex gap-[20px]">
            {Array(8)
              .fill(0)
              .map((_item, index: number) => (
                <Skeleton width={50} height={15} key={index} borderRadius={0} />
              ))}
          </div>
          <div className="flex justify-end mt-[20px]">
            <Skeleton width={300} height={40} borderRadius={4} />
          </div>
          <div className="w-full mt-[30px]">
            <div className="flex flex-col gap-[50px]">
              {Array(5)
                .fill(0)
                .map((_item, index: number) => {
                  if (index % 2 === 0) {
                    return <NewsCardSkeleton position="left" key={index} />
                  } else {
                    return <NewsCardSkeleton position="right" key={index} />
                  }
                })}
            </div>
          </div>
        </div>
        <div className="w-[300px] py-[10px] px-[10px] hidden lg:block">
          <Skeleton style={{ width: '90%' }} height={30} borderRadius={0} />
          <Skeleton width={100} height={30} borderRadius={0} />
          <div className="flex flex-col gap-[20px] mt-[25px]">
            {Array(3)
              .fill(0)
              .map((_item, index: number) => (
                <HighestNewsCardSkeleton key={index} />
              ))}
          </div>
        </div>
      </div>
      <div className="w-full flex gap-[20px] mt-[20px]">
        <div className="flex-1 border-t-[0.5px] border-[#808080] pt-[10px]">
          <Skeleton width={70} height={20} />
          <div className="w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-[20px] mt-[20px]">
            {Array(6)
              .fill(0)
              .map((_item, index: number) => (
                <Skeleton style={{ width: '100%', height: '200px' }} key={index} />
              ))}
          </div>
        </div>
        <div className="w-[300px] py-[10px] px-[10px] hidden lg:block">
          <Skeleton style={{ width: '90%' }} height={30} borderRadius={0} />
          <Skeleton width={100} height={30} borderRadius={0} />
          <div className="flex flex-col gap-[20px] mt-[25px]">
            {Array(3)
              .fill(0)
              .map((_item, index: number) => (
                <HighestNewsCardSkeleton key={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
