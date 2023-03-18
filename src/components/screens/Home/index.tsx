import Link from 'next/link'
import React from 'react'
import { AboutUs } from './AboutUs'
import { RoadMap } from './Roadmap'

const HomePage = () => {
  return (
    <main>
      <section id="aboutUs" className="feature">
        <AboutUs />
      </section>
      <section id="roadMap" className="feature">
        <RoadMap />
      </section>
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
