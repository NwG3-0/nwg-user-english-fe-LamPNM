import Link from 'next/link'
import React from 'react'
import { AboutUs } from './AboutUs'

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

const HomePage = () => {
  return (
    <main className="w-full">
      <section id="aboutUs" className="feature">
        <AboutUs />
      </section>
      <div className="pt-[40px] pb-[100px] px-[20px] block md:hidden">
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
      <div className="py-[60px] hidden md:block">
        <div className="relative w-fit h-fit mx-auto pl-[100px]">
          <div className="absolute z-100 left-[-50px] top-[30px]">
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
          </div>
          <div
            data-aos="zoom-in"
            data-aos-duration="600"
            className="relative w-[600px] h-[600px] rounded-full bg-[#e4f2f2]"
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
      <div className="mb-[120px] h-[1800px] relative md:h-fit ">
        <div className=" w-full h-[540px] bg-[url('/images/becomepro.jpg')]">
          <div
            data-aos="fade-up"
            data-aos-offset="-50"
            data-aos-duration="600"
            data-aos-delay="900"
            className="pt-[80px]"
          >
            <p className="text-white text-[40px] text-center font-bold">Become a Pro with these Course</p>
          </div>
          <div
            data-aos="fade-right"
            data-aos-offset="-50"
            data-aos-duration="600"
            data-aos-delay="900"
            className="mt-[20px] mb-[80px]"
          >
            <p className="text-white text-center">JUST PICK WHAT YOU NEED TO LEARN</p>
          </div>
        </div>
        <div className="absolute top-[320px] w-[80%] right-[50%] translate-x-[50%]">
          <div className="flex gap-x-[32px] md:flex-row flex-col">
            <div
              data-aos="fade-up-right"
              data-aos-offset="-50"
              data-aos-duration="500"
              data-aos-delay="900"
              className="bg-slate-50  pb-[20px] flex-1 shadow-xl"
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
              className="bg-slate-50 pb-[20px] flex-1 shadow-xl"
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
              className="bg-slate-50 pb-[20px] flex-1 shadow-xl"
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
              className="py-[36px]"
            >
              <p className="text-[64px] font-bold">Start a Journey. Enroll Now</p>
            </div>
            <p className="opacity-75 uppercase mb-[48px]">LEARN SOMETHING WHEREVER YOU ARE</p>

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
    </main>
  )
}

export default HomePage
