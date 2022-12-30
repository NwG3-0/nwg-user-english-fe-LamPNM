import { ListeningIcon, ReadingIcon, SpeakingIcon, WritingIcon } from '@components/common/CustomIcon'
import Link from 'next/link'
import React from 'react'

const HomePage = () => {
  // const [isCloudRun, setCloudRun] = useState<boolean>(false)

  // useEffect(() => {
  //   setTimeout(() => {
  //     setCloudRun(true)
  //   }, 1500)
  // }, [])

  return (
    <div className="w-full">
      <div className="relative  w-full h-[800px] bg-[url('/images/snowbg.webp')] bg-cover overflow-hidden">
        {/* <div>
          <img className="w-[300px] h-[300px]" src="/images/Logo.webp" alt="" />
        </div> */}
        {/* {isCloudRun && (
          <>
            <div className="clound1 absolute top-[0px]">
              <img src="/images/snowrain2.png" className="w-full h-full" alt="Cloud Run" />
            </div>
            <div className="clound2 absolute">
              <img src="/images/snowrain2.png" className="w-full h-full" alt="Cloud Run" />
            </div>
            <div className="clound3 absolute">
              <img src="/images/snowrain2.png" className="w-full h-full" alt="Cloud Run" />
            </div>
          </>
        )} */}
      </div>
      <div className="bg-[url('/images/home-background-navbar.webp')] bg-cover w-full py-[50px]">
        <div data-aos="fade-up" data-aos-offset="0" className="home-title w-full text-center font-extrabold text-8xl ">
          <h1>Choose your skill</h1>
        </div>
        <div className="grid md:grid-cols-4 py-[32px] grid-cols-2 gap-4">
          <div
            data-aos="zoom-in"
            data-aos-offset="50"
            data-aos-duration="500"
            data-aos-delay="300"
            className="m-auto cursor-pointer hover-scale flex flex-col px-[40px] py-[24px] bg-white rounded-full"
          >
            <ListeningIcon width={100} height={100} color="" />
            <div className="text-center text-[24px] font-bold text-orange-500">Listening</div>
          </div>
          <div
            data-aos="zoom-in"
            data-aos-offset="-50"
            data-aos-duration="500"
            data-aos-delay="500"
            className="m-auto cursor-pointer hover-scale flex flex-col px-[40px] py-[24px] bg-white rounded-full"
          >
            <ReadingIcon width={100} height={100} color="" />
            <div className="text-center text-[24px] font-bold text-orange-500">Reading</div>
          </div>
          <div
            data-aos="zoom-in"
            data-aos-offset="-50"
            data-aos-duration="500"
            data-aos-delay="700"
            className="m-auto cursor-pointer hover-scale flex flex-col px-[40px] py-[24px] bg-white rounded-full"
          >
            <WritingIcon width={100} height={100} color="" />
            <div className="text-center text-[24px] font-bold text-orange-500">Writing</div>
          </div>
          <div
            data-aos="zoom-in"
            data-aos-offset="-50"
            data-aos-duration="500"
            data-aos-delay="900"
            className="m-auto cursor-pointer hover-scale flex flex-col px-[40px] py-[24px] bg-white rounded-full"
          >
            <SpeakingIcon width={100} height={100} color="" />
            <div className="text-center text-[24px] font-bold text-orange-500">Speaking</div>
          </div>
        </div>
      </div>
      <div className="py-[30px]">
        <div className="relative w-fit h-fit mx-auto pl-[100px]">
          <div className="absolute z-100 left-[-50px] top-[30px]">
            <div className="text-[48px] font-extrabold">
              <div data-aos="fade-right" data-aos-duration="600">
                Learn about
              </div>
              <div data-aos="fade-right" data-aos-duration="600" className="text-red-400">
                our levels
              </div>
            </div>
            <div>
              <div data-aos="fade-up" data-aos-duration="600" className="font-bold text-[18px]">
                Don't know your English level
              </div>
              <div data-aos="fade-up" data-aos-duration="600">
                Each course is divided into specific learning
                <br />
                levels. We teach up to C1 in English and B2 in
                <br />
                Business English.
              </div>
            </div>
          </div>
          <div className="relative w-[600px] h-[600px] rounded-full bg-[#e4f2f2]">
            <div className="absolute train-run w-full h-full z-50 rounded-full">
              <div className="absolute w-[30px] h-[30px] bg-[#eebb76]"></div>
            </div>
            <div className="absolute rounded-full top-[20px] left-[50%] translate-x-[-50%] text-center py-[35px] w-[165px] bg-[#eebb76] border-[1px] border-[#000]">
              <div className="font-bold text-[24px]">A1</div>
              <div className="uppercase text-[14px] font-medium">absolute beginner</div>
              <div className="text-[12px]">
                Basic words
                <br />& phrases
              </div>
            </div>
            <div className="absolute rounded-full bottom-[90px] left-[70px] text-center w-[130px] py-[20px] bg-[#b6e0d9] border-[1px] border-[#000]">
              <div className="font-bold text-[24px]">A2</div>
              <div className="uppercase text-[14px] font-medium">beginner</div>
              <div className="text-[12px]">
                Simple
                <br />
                Interactions
              </div>
            </div>
            <div className="absolute rounded-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center w-[130px] py-[20px] bg-[#dc7672] border-[1px] border-[#000]">
              <div className="font-bold text-[24px]">B1</div>
              <div className="uppercase text-[14px] font-medium">intermediate</div>
              <div className="text-[12px]">
                Everyday
                <br />
                conversation
              </div>
            </div>
            <div className="absolute rounded-full bottom-[20px] left-[60%] translate-x-[-60%] text-center w-[160px] bg-[#eebb76] border-[1px] border-[#000] py-[40px]">
              <div className="font-bold text-[24px]">B2</div>
              <div className="uppercase text-[14px] font-medium">upper-intermediate</div>
              <div className="text-[12px]">Complex topics</div>
            </div>
            <div className="absolute right-[50px] rounded-full top-[40%] translate-y-[-40%] text-center w-[130px] py-[20px] bg-[#b6e0d9] border-[1px] border-[#000]">
              <div className="font-bold text-[24px]">C1</div>
              <div className="uppercase text-[14px] font-medium">advanced</div>
              <div className="text-[12px]">
                Proficient
                <br />
                language use
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-[120px] h-[1800px] relative md:h-fit ">
        <div className=" w-full h-[540px] bg-[url('/images/becomepro.jpg')]">
          <div
            data-aos="fade-up"
            data-aos-offset="-50"
            data-aos-duration="600"
            data-aos-delay="900"
            className="text-white text-[40px] text-center font-bold pt-[80px]"
          >
            Become a Pro with these Course
          </div>
          <div
            data-aos="fade-right"
            data-aos-offset="-50"
            data-aos-duration="600"
            data-aos-delay="900"
            className="text-white text-center mt-[20px] mb-[80px]"
          >
            JUST PICK WHAT YOU NEED TO LEARN
          </div>
        </div>
        <div className="absolute top-[320px] w-[80%] right-[50%] translate-x-[50%]">
          <div className="flex gap-x-[32px] md:flex-row flex-col">
            <div
              data-aos="fade-up-right"
              data-aos-offset="-50"
              data-aos-duration="500"
              data-aos-delay="900"
              className="bg-slate-50  pb-[20px] flex-1 "
            >
              <div className="aspect-auto">
                <img className="w-full h-full" src="/images/becomeproimg1.jpg" />
              </div>
              <div className="py-[25px] px-[40px]">
                <div className="flex w-full text-center">
                  <span className="mx-[8px]">01</span>
                  <h3 className="text-[17px] font-bold">GREAT FOR HIGH SCHOOL</h3>
                </div>
                <p>Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-offset="-50"
              data-aos-duration="500"
              data-aos-delay="900"
              className="bg-slate-50 pb-[20px] flex-1"
            >
              <div className="aspect-auto">
                <img className="w-full h-full" src="/images/becomeproimg2.jpg" />
              </div>
              <div className="py-[25px] px-[40px]">
                <div className="flex w-full text-center">
                  <span className="mx-[8px]">02</span>
                  <h3 className="text-[17px] font-bold">GROUP TRAINING</h3>
                </div>
                <p>Dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
              </div>
            </div>
            <div
              data-aos="fade-up-left"
              data-aos-offset="-50"
              data-aos-duration="500"
              data-aos-delay="900"
              className="bg-slate-50 pb-[20px] flex-1"
            >
              <div className="aspect-auto">
                <img className="w-full h-full" src="/images/becomeproimg3.jpg" />
              </div>
              <div className="py-[25px] px-[40px]">
                <div className="flex w-full text-center">
                  <span className="mx-[8px]">03</span>
                  <h3 className="text-[17px] font-bold">BETTER FOR GROUP STUDIES</h3>
                </div>
                <p>Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
              </div>
            </div>
          </div>
          <div className="w-[80%] m-auto text-center">
            <div
              data-aos="zoom-in"
              data-aos-offset="-50"
              data-aos-duration="500"
              data-aos-delay="700"
              className="text-[64px] font-bold py-[36px]"
            >
              Start a Journey. Enroll Now
            </div>
            <div className="opacity-75 uppercase mb-[48px]">LEARN SOMETHING WHEREVER YOU ARE</div>

            <Link
              data-aos="fade-right"
              data-aos-offset="-50"
              data-aos-duration="500"
              data-aos-delay="700"
              className="w-fit rounded-[16px] px-[54px] py-[20px] bg-gradient-to-r mx-auto block from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 "
              href={'/login'}
            >
              Join now with us
            </Link>
          </div>
        </div>
      </div>
      <div className=" w-full bg-[url('/images/background-footer.webp')] h-[490px] bg-cover"></div>
    </div>
  )
}

export default HomePage
