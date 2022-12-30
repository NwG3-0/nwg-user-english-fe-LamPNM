interface Props {
  src: string
  fallback: string
  style?: any
  alt?: string
  type?: string
  classNameCustom?: string
}

const ImgWithFallback = ({ src, fallback, type = 'image/webp', style = {}, alt, classNameCustom, ...rest }: Props) => {
  return (
    <picture style={style} className={classNameCustom}>
      <source srcSet={src} type={type} />
      <img src={fallback} {...rest} alt={alt} />
    </picture>
  )
}

export default ImgWithFallback
