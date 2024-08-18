// src/components/Carousel.js
import React from 'react';
import Slider from 'react-slick';

const images = [
  '/BFF1.jpg',
  '/onlineshop.jpg',
  '/summersale.jpeg',
  '/diwalisale.avif',
];

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
};

export default function Carousel() {
  return (
    <div className="w-full relative">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className="h-64">
            <img
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>

      {/* Custom CSS for slick dots and arrows */}
      <style jsx>{`
        .slick-dots {
          bottom: 10px;
          display: flex;
          justify-content: center;
          padding: 0;
          margin: 0;
        }
        .slick-dots li {
          margin: 0 2px;
        }
        .slick-dots li button {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #ccc; /* Default color */
        }
        .slick-dots li.slick-active button {
          background-color: #000; /* Active dot color */
        }
        .slick-prev,
        .slick-next {
          width: 40px;
          height: 40px;
          z-index: 1;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
        }
        .slick-prev {
          left: 10px;
        }
        .slick-next {
          right: 10px;
        }
        .slick-prev::before,
        .slick-next::before {
          color: white;
          font-size: 20px;
        }
      `}</style>
    </div>
  );
}
