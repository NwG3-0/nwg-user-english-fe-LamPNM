export interface Props {
  path: string
}
export const Banner = ({ path }: Props) => {
  return (
    <div className={`relative w-full h-[800px] bg-cover overflow-hidden`} style={{ backgroundImage: `url(${path})` }}>
      <div
        data-aos="zoom-in"
        data-aos-offset="50"
        data-aos-duration="500"
        data-aos-delay="300"
        className="mx-auto md:absolute drop-shadow-xl max-md:text-center max-md:mt-[300px] w-fit md:w-[720px] break-words top-[40%] right-[10px] text-[48px] md:text-[64px]"
      >
        <p className="text-[#FFFFFF] font-bold">IELTS is your future, time to learn it!</p>
      </div>
    </div>
  )
}
