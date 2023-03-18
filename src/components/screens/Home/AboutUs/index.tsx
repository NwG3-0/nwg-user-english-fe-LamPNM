export const AboutUs = () => {
  return (
    <div className="min-h-screen flex bg-[url('/images/background_aboutUs.webp')] bg-cover bg-no-repeat">
      <div className="w-full h-full bg-[#00000083] absolute z-1" />
      <div
        data-aos="zoom-in"
        data-aos-duration="600"
        className="w-[650px] px-[30px] pt-[20px] pb-[30px] text-[#FFFFFF] m-auto relative z-50 border-[#FFFFFF] border-[1px]"
      >
        <span className={`absolute w-[12px] h-[12px] bg-[#FFFFFF] top-0 left-0`} />
        <span className={`absolute w-[12px] h-[12px] bg-[#FFFFFF] top-0 right-0`} />
        <span className={`absolute w-[12px] h-[12px] bg-[#FFFFFF] bottom-0 left-0`} />
        <span className={`absolute w-[12px] h-[12px] bg-[#FFFFFF] bottom-0 right-0`} />

        <span
          className={`absolute h-[calc(100%-40px)] w-[1px]
        bg-[#ffffff80] top-[20px] left-[10px]`}
        ></span>
        <span
          className={`absolute h-[1px] w-[10px]
        bg-[#ffffff80] top-[20px] left-[11px]`}
        ></span>
        <span
          className={`absolute h-[1px] w-[10px]
        bg-[#ffffff80] bottom-[20px] left-[11px]`}
        ></span>

        <span
          className={`absolute h-[calc(100%-40px)] w-[1px]
        bg-[#ffffff80] top-[20px] right-[10px]`}
        ></span>
        <span
          className={`absolute h-[1px] w-[10px]
        bg-[#ffffff80] top-[20px] right-[11px] `}
        ></span>
        <span
          className={`absolute h-[1px] w-[10px]
        bg-[#ffffff80] bottom-[20px] right-[11px] `}
        ></span>

        <span
          className={`absolute w-[calc(100%-40px)] h-[1px]
        bg-[#ffffff80] left-[20px] top-[10px] `}
        ></span>
        <span
          className={`absolute h-[9px] w-[1px]
        bg-[#ffffff80] right-[20px] top-[11px]`}
        ></span>
        <span
          className={`absolute h-[9px] w-[1px]
        bg-[#ffffff80] left-[20px] top-[11px]`}
        ></span>

        <span
          className={`absolute w-[calc(100%-40px)] h-[1px]
        bg-[#ffffff80] left-[20px] bottom-[10px] `}
        ></span>
        <span
          className={`absolute h-[9px] w-[1px]
        bg-[#ffffff80] right-[20px] bottom-[11px]`}
        ></span>
        <span
          className={`absolute h-[9px] w-[1px]
        bg-[#ffffff80] left-[20px] bottom-[11px]`}
        ></span>

        <p className="lg:text-[64px] font-semibold text-center">About website</p>
        <p className="text-[20px]">
          English is one of the most widely spoken languages in the world, and it is often considered the global
          language of business, education, and communication. As a result, many people around the world seek to learn
          and improve their English language skills.
        </p>
        <p className="text-[20px]">
          In English Learning website, we provide to you some features that help you improve your skills in english. On
          the other hand, there are some games that interested the your mind and help you learn faster.
        </p>
      </div>
    </div>
  )
}
