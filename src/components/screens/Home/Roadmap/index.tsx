interface Degree {
  id: number
  degreeName: string
  aboutDegree: string
  content: string
}

const DEGREES: Degree[] = [
  {
    id: 1,
    degreeName: 'A1',
    aboutDegree: 'absolute beginner',
    content: 'Basic words & phrases',
  },
  {
    id: 2,
    degreeName: 'A2',
    aboutDegree: 'beginner',
    content: 'Simple Interactions',
  },
  {
    id: 3,
    degreeName: 'B1',
    aboutDegree: 'intermediate',
    content: 'Everyday conversation',
  },
  {
    id: 4,
    degreeName: 'B2',
    aboutDegree: 'upper-intermediate',
    content: 'Complex topics',
  },
  {
    id: 5,
    degreeName: 'C1',
    aboutDegree: 'advanced',
    content: 'Proficient language use',
  },
]

export const RoadMap = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[url('/images/background_roadMap.webp')] bg-cover bg-no-repeat">
      <div className="w-full h-full bg-[#00000083] absolute z-1" />
      <div className="block md:hidden relative z-50">
        <div className="text-[48px] font-extrabold">
          <div data-aos="fade-right" data-aos-duration="600">
            <p>Learn about</p>
          </div>
          <div data-aos="fade-right" data-aos-duration="600" className="text-red-400">
            <p>our levels</p>
          </div>
        </div>
        <div>
          <div data-aos="fade-up" data-aos-duration="600" className="font-bold text-[18px]">
            <p>Don't know your English level</p>
          </div>
          <div data-aos="fade-up" data-aos-duration="600">
            <p>
              Each course is divided into specific learning
              <br />
              levels. We teach up to C1 in English and B2 in
              <br />
              Business English.
            </p>
          </div>
        </div>
        <div className="border-l-[5px] mt-[30px] pb-[30px] border-[#808080] relative flex flex-col gap-[20px]">
          {DEGREES.map((degree: Degree, index: number) => (
            <div
              className={`${index === 0 ? 'mt-[-20px]' : ''} pl-[20px] ${
                index === DEGREES.length - 1 ? 'absolute bottom-[-60px] pt-[10px]' : 'relative'
              }`}
              key={degree.id}
            >
              <div data-aos="zoom-in" data-aos-duration="600">
                <p className="text-[24px] font-bold">{degree.degreeName}</p>
                <p className="uppercase font-bold">{degree.aboutDegree}</p>
                <p className="">{degree.content}</p>
              </div>
              <div
                className={`w-[15px] h-[15px] bg-[#808080] rotate-45 absolute left-[-10.5px] ${
                  index === DEGREES.length - 1 ? 'top-[22px]' : 'top-[14px]'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="hidden md:block relative z-50">
        <div className="relative w-fit h-fit mx-auto pl-[100px]">
          <div className="absolute z-100 left-[-50px] top-[30px]">
            <div className="text-[48px] font-extrabold">
              <div data-aos="fade-right" data-aos-duration="600">
                <p className="text-[#FFFFFF]">Learn about</p>
              </div>
              <div data-aos="fade-right" data-aos-duration="600" className="text-red-400">
                <p>our levels</p>
              </div>
            </div>
            <div>
              <div data-aos="fade-up" data-aos-duration="600" className="font-bold text-[18px]">
                <p className="text-[#FFFFFF]">Don't know your English level</p>
              </div>
              <div data-aos="fade-up" data-aos-duration="600" className="text-[#FFFFFF]">
                <p>
                  Each course is divided into specific learning
                  <br />
                  levels. We teach up to C1 in English and B2 in
                  <br />
                  Business English.
                </p>
              </div>
            </div>
          </div>
          <div
            data-aos="zoom-in"
            data-aos-duration="600"
            className="relative w-[600px] h-[600px] rounded-full bg-[#00000046]"
          >
            <div className="absolute train-run w-full h-full z-50 rounded-full">
              <img
                src="/images/train.svg"
                alt="Train"
                className="absolute w-[60px] object-cover -rotate-[20deg] top-[-35px]"
              />
            </div>
            <div className="absolute rounded-full top-[20px] left-[50%] translate-x-[-50%] text-center py-[35px] w-[165px] bg-[#eebb76] border-[1px] border-[#000]">
              <div className="font-bold text-[24px]">A1</div>
              <p className="uppercase text-[14px] font-medium">absolute beginner</p>
              <p className="text-[12px]">
                Basic words
                <br />& phrases
              </p>
            </div>
            <div className="absolute rounded-full bottom-[90px] left-[70px] text-center w-[130px] py-[20px] bg-[#b6e0d9] border-[1px] border-[#000]">
              <p className="font-bold text-[24px]">A2</p>
              <p className="uppercase text-[14px] font-medium">beginner</p>
              <p className="text-[12px]">
                Simple
                <br />
                Interactions
              </p>
            </div>
            <div className="absolute rounded-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center w-[130px] py-[20px] bg-[#dc7672] border-[1px] border-[#000]">
              <p className="font-bold text-[24px]">B1</p>
              <p className="uppercase text-[14px] font-medium">intermediate</p>
              <p className="text-[12px]">
                Everyday
                <br />
                conversation
              </p>
            </div>
            <div className="absolute rounded-full bottom-[20px] left-[60%] translate-x-[-60%] text-center w-[160px] bg-[#eebb76] border-[1px] border-[#000] py-[40px]">
              <p className="font-bold text-[24px]">B2</p>
              <p className="uppercase text-[14px] font-medium">upper-intermediate</p>
              <p className="text-[12px]">Complex topics</p>
            </div>
            <div className="absolute right-[50px] rounded-full top-[40%] translate-y-[-40%] text-center w-[130px] py-[20px] bg-[#b6e0d9] border-[1px] border-[#000]">
              <p className="font-bold text-[24px]">C1</p>
              <p className="uppercase text-[14px] font-medium">advanced</p>
              <p className="text-[12px]">
                Proficient
                <br />
                language use
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
