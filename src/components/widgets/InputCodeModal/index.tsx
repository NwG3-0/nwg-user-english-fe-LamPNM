import Link from 'next/link'

export const InputCodeModal = () => {
  return (
    <div className="w-[100%]">
      <p>Nhập mã code</p>
      <div className="mt-[10px]">
        <input placeholder="XXX-XXX-XXX-XXX" />
      </div>
      <div className="flex justify-end mt-[5px]">
        <Link href={'/checkout'} className="text-[12px]">
          Bạn không có mã để nhập?
        </Link>
      </div>
      <button className="w-full text-center mt-[10px] bg-[#808080] text-white">Submit</button>
    </div>
  )
}
