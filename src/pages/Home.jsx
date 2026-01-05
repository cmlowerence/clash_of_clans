import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Dummy Data - REPLACE THESE IMAGES LATER
const troopsData = [
  {
    id: 1,
    name: "Barbarian",
    desc: "This fearless warrior relies on his bulging muscles and striking mustache to wreak havoc in enemy villages.",
    // Using a placeholder image for now
    img: "https://api-assets.clashofclans.com/troops/barbarian.png",
    bg: "from-yellow-600 to-red-600"
  },
  {
    id: 2,
    name: "Archer",
    desc: "These sharpshooters like to keep their distance on the battlefield and in life. Nothing makes them happier than single-mindedly taking down their target.",
    img: "https://api-assets.clashofclans.com/troops/archer.png",
    bg: "from-pink-600 to-purple-800"
  },
  {
    id: 3,
    name: "P.E.K.K.A",
    desc: "Is P.E.K.K.A a knight? A samurai? A robot? No one knows! P.E.K.K.A's armor absorbs even the mightiest of blows.",
    img: "https://api-assets.clashofclans.com/troops/pekka.png",
    bg: "from-blue-700 to-indigo-900"
  }
];

const Home = () => {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Hero Slider Section */}
      <section className="h-[calc(100vh-64px)] w-full">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          effect={'fade'}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="h-full w-full"
        >
          {troopsData.map((troop) => (
            <SwiperSlide key={troop.id}>
              <div className={`relative h-full w-full bg-gradient-to-br ${troop.bg} flex flex-col md:flex-row items-center justify-center p-8 overflow-hidden`}>
                
                {/* Text Content */}
                <div className="z-10 md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                  <h1 className="text-5xl md:text-7xl font-extrabold uppercase drop-shadow-lg tracking-tighter">
                    {troop.name}
                  </h1>
                  <p className="text-lg md:text-2xl font-light max-w-md drop-shadow-md bg-black/30 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                    {troop.desc}
                  </p>
                </div>

                {/* Image Content */}
                <div className="md:w-1/2 flex justify-center items-center mt-8 md:mt-0 relative z-10">
                   <img 
                    src={troop.img} 
                    alt={troop.name} 
                    className="h-64 md:h-[500px] object-contain drop-shadow-2xl animate-pulse-slow"
                    // If image fails (403/404), this creates a fallback box
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://via.placeholder.com/400x400?text=No+Image";
                    }}
                  />
                </div>

                {/* Background decorative circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -z-0"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default Home;
