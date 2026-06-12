import Nav from "@/components/layout/NavAr";
import Footer from "@/components/layout/FooterAr";
import LightField from "@/components/core/LightField";
import Hero from "@/components/sections/HeroAr";
import Services from "@/components/sections/ServicesAr";
import Process from "@/components/sections/ProcessAr";
import Work from "@/components/sections/WorkAr";
import Why from "@/components/sections/WhyAr";
import Testimonials from "@/components/sections/TestimonialsAr";
import Contact from "@/components/sections/ContactAr";

export default function Home() {
  return (
    <>
      <LightField />
      <Nav />
      <main id="main" className="relative">
        <Hero />
        <Services />
        <Process />
        <Work />
        <Why />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
