import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Shop } from "@/components/sections/Shop";
import { Gallery } from "@/components/sections/Gallery";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { Location } from "@/components/sections/Location";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Shop />
      <Gallery />
      <About />
      <Testimonials />
      <Location />
    </>
  );
}
