import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "./Affiche.css";

export default function Affiche({ data, title }) {
  const navigate = useNavigate();

  const handleAnimeClick = (anime) => {
    navigate(`/anime/${anime.mal_id}`);
  };
  if (!data) {
    return null; // or display a loading message or handle the absence of data in some way
  }

  return (
    <div className="mx-[90px] my-4">
      <h2 className="text-3xl">{title}</h2>
      <Swiper
        loop={true}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          type: "progressbar",
        }}
        navigation={true} 
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-[500px] my-4"
      >
        {data.map((item, index) => (
          <SwiperSlide
            key={index}
            className="flex flex-col items-center justify-start h-full rounded transition cursor-pointer duration-300 ease-in-out hover:opacity-75 hover:text-blue-500"
            onClick={() => handleAnimeClick(item)}
          >
            {/* <div className="flex flex-col items-center justify-start h-full"> */}
            <img
              src={item.images.jpg.large_image_url}
              alt={item.title}
              className="object-cover !h-[475px]"
            />
            <div>
              <h3 className="text-center whitespace-nowrap w-[760px] text-ellipsis overflow-hidden">
                {item.title}
              </h3>
            </div>
            {/* </div> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
