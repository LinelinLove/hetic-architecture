import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
import { Grid, Pagination } from "swiper/modules";
import "./Carousel.css";
import { useNavigate } from "react-router-dom";

export default function Carousel({ data, title }) {
  const navigate = useNavigate();

  const handleAnimeClick = (anime) => {
    navigate(`/anime/${anime.mal_id}`);
  };
  if (!data) {
    return null; // or display a loading message or handle the absence of data in some way
  }
  return (
    <div className="mx-[90px] my-4">
      <h2 className="text-3xl py-4">{title}</h2>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        grid= {{
          rows: 2,
          fill: "row",
        }}

        modules={[Grid, Pagination]}
        className="mySwiper h-[600px]"
      >
        {data.map((item, index) => (
          <SwiperSlide
            key={index}
  
            className="flex flex-col items-start justify-start h-full transition duration-300 ease-in-out"
            
          >
            {/* <div className="flex flex-col items-center justify-start h-full"> */}
            <div className="anime-card flex flex-col items-center justify-start hover:opacity-75 cursor-pointer">

              <img
                src={item.images.jpg.large_image_url}
                alt={item.title}
                className=" !w-[167px] !h-[237px] object-cover rounded"
                onClick={() => handleAnimeClick(item)} 
              />
              <div>
                <div className="carousel-item-title">
                  <h3 className="whitespace-nowrap w-[167px] text-ellipsis overflow-hidden">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
            {/* </div> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
