import Slider from 'react-slick'

interface CustomSliderType {
  children: any
  slidesToShow: number
  slidesToScroll: number
}
export const CustomSlider = ({ children, slidesToShow, slidesToScroll }: CustomSliderType) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll,
  }
  return (
    <Slider {...settings}>
      <div>{children}</div>
    </Slider>
  )
}
