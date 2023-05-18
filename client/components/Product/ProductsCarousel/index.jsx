import React from "react";
import Slider from "react-slick";
import ProductItem from "../ProductItem";
import {
  SlickArrowNext,
  SlickArrowPrev,
} from "@/components/shared/SlickArrows";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.module.css";

export default function ProductsCarousel({ products = [] }) {
  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 300,
    swipeToSlide: true,
    slidesToShow: 5,
    slidesToScroll: 3,
    prevArrow: <SlickArrowPrev />,
    nextArrow: <SlickArrowNext />,
    lazyLoad: "progressive",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <React.Fragment>
      <Slider {...settings}>
        {products.map(({ _id, name, price, thumbnail, percentageDiscount }) => (
          <ProductItem
            key={_id}
            id={_id}
            name={name}
            price={price}
            thumbnail={thumbnail}
            percentageDiscount={percentageDiscount}
          />
        ))}
      </Slider>
    </React.Fragment>
  );
}
