import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="h-screen bg-hero bg-no-repeat bg-cover bg-center relative">
      {/* <div className="bg-black bg-opacity-20 absolute inset-0"></div> */}

      <div className="px-8 md:py-24 py-6 max-w-[1200px] mx-auto flex flex-col items-center justify-center">
        <h1 className="md:text-5xl text-5xl text-center font-bold mt-36">
          Africa&apos;s No. 1 Sport&apos;s Data Platform
        </h1>

        <p className="text-center text-2xl mt-14 max-w-[600px]">
          Are you looking for ways to intergrate data into your sport team to
          improve on your performance and decision making?
        </p>

        <button className="bg-[#01BF71] rounded-[50px] px-10 py-2 mt-12  hover:bg-[#A020F0] flex items-center">
          Schedule a demo with us
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
