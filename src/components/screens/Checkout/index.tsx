import Link from 'next/link'

export const Checkout = () => {
  return (
    <div className="mt-[100px] pb-[50px]">
      <p className="text-center text-[32px] font-semibold">Become a vip member of Nwg English</p>
      <p className="text-center text-[24px] font-semibold">
        Chỉ với 500.000 vnd bạn có thể sử dụng tất cả tính năng của website trọn đời
      </p>
      <div className="flex container items-center justify-between md:w-[1100px] mx-auto mt-[20px]">
        <div>
          <p className="text-[20px]">Các bước hướng dẫn:</p>
          <div className="flex flex-col gap-[10px] mt-[10px]">
            <p>
              <span className="text-red-500">Bước 1: </span>Login đúng email mà bạn sử dụng
            </p>
            <p>
              <span className="text-red-500">Bước 2: </span> Quét QR có sẵn ở trang web
            </p>
            <p>
              <span className="text-red-500">Bước 3: </span> Sau khi thanh toán thành công, hãy đến hộp thư gmail để lấy
              mã code
            </p>
            <p>
              <span className="text-red-500">Bước 4: </span> Sang trang{' '}
              <Link href={'/user_profile'} className="text-[#808080]">
                User Profile
              </Link>{' '}
              rồi bấm vào button "Kích hoạt thành viên" <br /> nhập mã code nhận được rồi ấn tiếp button "Kích hoạt"
            </p>
            <p className="italic">Cảm ơn vì đã tin tưởng sử dụng trang web!</p>
          </div>
        </div>
        <img src="/images/qr.jpg" alt="QR code" className="w-[300px] object-contain" />
      </div>
    </div>
  )
}
