import { FaceBookIcon, GoogleIcon, InstagramIcon, TelegramIcon, YouTubeIcon } from '@components/common/CustomIcon'

const Footer = () => {
  return (
    <div className="">
      <div className="bg-[#00eda4]">
        <div className="m-auto w-[80%] grid grid-cols-4 py-[36px] ">
          <div className="col-span-2 text-[38px] text-white font-bold">
            Get hands on the <span className="underline underline-offset-4">Great Courses</span> you like
          </div>
          <div className="col-span-1 text-[20px] text-center text-white font-bold flex justify-center m-auto">
            Follow us on
          </div>
          <div className="col-span-1 flex flex-wrap gap-x-[8px] m-auto">
            <YouTubeIcon width={48} height={48} color={'red'} />
            <FaceBookIcon width={48} height={48} color={'#fff'} />
            <TelegramIcon width={48} height={48} color={'#fff'} />
            <InstagramIcon width={48} height={48} color={'url(#yOrnnhliCrdS2gy~4tD8ma)'} />
            <GoogleIcon width={48} height={48} color={'#fbc02d'} />
          </div>
        </div>
      </div>
      <div className="m-auto w-[80%] grid grid-cols-3 py-[32px] border-b-2 border-indigo-500">
        <div className="flex flex-col">
          <div className="text-[24px] font-bold">Link</div>
          <div className=" font-serif py-[8px]">Course</div>
          <div className=" font-serif py-[8px]">Tutor</div>
          <div className=" font-serif py-[8px]">Quiz & Test</div>
        </div>
        <div className="flex flex-col">
          <div className="text-[24px] font-bold">About Us</div>
          <div className=" font-serif py-[8px]">About</div>
          <div className=" font-serif py-[8px]">Talk to us</div>
          <div className=" font-serif py-[8px]">Help</div>
        </div>
        <div className="flex flex-col">
          <div className="text-[24px] font-bold ">Contact </div>
          <div className="font-serif py-[8px]">Address77 Indian St. Baltimore, MD 21206</div>
          <div className="font-serif py-[8px]">Phone+3233-332-334</div>
          <div className="font-serif py-[8px]">Emailelearny@example.com</div>
        </div>
      </div>
    </div>
  )
}

export default Footer
