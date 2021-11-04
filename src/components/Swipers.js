import { Swiper } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

const Swipers = (props) => {
  const { children, slidesPerView } = props;
  return (
    <>
      <Swiper watchSlidesProgress={true} slidesPerView={slidesPerView}>
        {children}
      </Swiper>
    </>
  );
};

export default Swipers;

Swipers.defaultProps = {
  children: null,
  slidesPerView: 7,
};
