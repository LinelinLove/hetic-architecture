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
    <div className="mx-[90px] my-4 pt-[2dvh]">
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
            className="flex flex-col items-center justify-start h-full rounded transition duration-300 ease-in-out "
          >
           
            <div onClick={() => handleAnimeClick(item)} className=" anime-card flex flex-row items-center justify-start hover:opacity-75 cursor-pointer">
              <img
                src={item.images.jpg.large_image_url}
                alt={item.title}
                className="object-cover !h-[475px]"
              />
              <div className="h-full w-[50dvw] px-5 flex flex-col gap-4">
                <h2 className="!text-[2rem] text-center whitespace-nowrap text-ellipsis overflow-hidden underline-offset-8">
                  {item.title}
                </h2>
                <p>{item.synopsis}</p>
              </div>
            </div>
         
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
