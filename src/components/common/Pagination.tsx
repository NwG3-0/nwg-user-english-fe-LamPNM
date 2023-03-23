import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DOTS, usePagination } from '@hooks/usePagination'

export type Props = {
  persistOnUrl?: boolean
  totalRecords: number
  limit?: number
  currentPage: number
  scrollToView?: () => void
  onChangePage: (page: number) => void
}

export const Pagination = React.memo(
  ({ persistOnUrl = true, currentPage: page, totalRecords, limit = 9, onChangePage, scrollToView }: Props) => {
    const { pathname, query } = useRouter()
    const currentPage = page ? page : 1
    const totalPage = Math.ceil(totalRecords / limit)
    const paginationRange = usePagination(totalRecords, limit, 1, currentPage ? currentPage : 1)

    return (
      <div className="flex justify-center items-center select-none gap-[30px]">
        <button
          className="w-0 h-0 border-[7px_14px_7px_0] border-[transparent_#808080_transparent_transparent]
        hover:border-[transparent_#ffffff_transparent_transparent]
        disabled:border-[transparent_#808080_transparent_transparent] disabled:opacity-70
        disabled:cursor-not-allowed transition-all duration-200 ease-linear"
          disabled={currentPage === 1}
          onClick={() => currentPage > 1 && onChangePage(currentPage - 1)}
        />

        <div className="mx-3 items-center justify-center hidden md:flex gap-5">
          {persistOnUrl
            ? paginationRange?.map((element, index) => (
                <Link
                  key={index}
                  href={{
                    pathname,
                    query: { ...query, page: element },
                  }}
                  className={`flex justify-center items-center transition-all duration-200 ease-linear
              ${currentPage === element ? 'text-[#FF5722] font-[600]' : 'text-[#808080] font-medium'}
              ${element !== DOTS && 'cursor-pointer'}`}
                  scroll={false}
                  onClick={scrollToView}
                >
                  {typeof element === 'number' ? element.toString().padStart(2, '0') : element}
                </Link>
              ))
            : paginationRange?.map((element, index) => (
                <div
                  key={index}
                  className={`flex justify-center items-center transition-all duration-200 ease-linear
              ${currentPage === element ? 'text-[#FF5722] font-[600]' : 'text-[#808080] font-medium'}
              ${element !== DOTS && 'cursor-pointer'}`}
                  onClick={() => onChangePage(Number(element))}
                >
                  {typeof element === 'number' ? element.toString().padStart(2, '0') : element}
                </div>
              ))}
        </div>
        <div className="mx-3 items-center md:hidden flex">
          <span className="text-shadow-2 px-4 text-[#808080] flex items-center justify-center gap-4 font-medium">
            <span className="text-[#FF5722]">{currentPage.toString().padStart(2, '0')}</span> <span>/</span>{' '}
            <span className="text-white">{totalPage.toString().padStart(2, '0')}</span>
          </span>
        </div>
        <button
          className="w-0 h-0 border-[7px_0_7px_14px] border-[transparent_transparent_transparent_#808080]
        hover:border-[transparent_transparent_transparent_#ffffff]
        disabled:border-[transparent_transparent_transparent_#808080] disabled:opacity-70
        disabled:cursor-not-allowed transition-all duration-200 ease-linear"
          disabled={currentPage === totalPage}
          onClick={() => currentPage < totalPage && onChangePage(currentPage + 1)}
        />
      </div>
    )
  },
)
