export const LoadingbtnAnimate = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  return (
    <div className="loading-btn">
      <div className="loader">
        {arr.map((item: number, index: number) => (
          <span
            key={`loading ${index}`}
            className={`span-loader${item}`}
            style={{
              transform: `rotate(calc(18deg*${item}))`,
            }}
          ></span>
        ))}
      </div>
    </div>
  )
}
