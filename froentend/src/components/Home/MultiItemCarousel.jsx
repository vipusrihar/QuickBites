import React from 'react';
import Slider from 'react-slick';
import { topMeals } from './topMeals.js';
import CarouselItem from './Carouseltem.jsx'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MultiItemCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplay : true,
    autoplaySpeed: 2500,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="px-5 py-2">
      <Slider {...settings}>
        {topMeals.map((item, index) => (
          <CarouselItem
            key={index}
            image={item.image}
            title={item.title}
          />
        ))}
      </Slider>
    </div>
  );
};

export default MultiItemCarousel;
