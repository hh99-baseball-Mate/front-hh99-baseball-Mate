import "swiper/swiper-bundle.min.css"
import "swiper/swiper.min.css"

const Swipers = (props) => {
  const { children } = props
  return (
    <>
      <div
        style={{
          overflowX: "auto",
          display: "flex",
          alignItems: "center",
          overflowY: "hidden",
        }}
      >
        {children}
      </div>
    </>
  )
}

export default Swipers

Swipers.defaultProps = {
  children: null,
}
