import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import LightField from "@/components/core/LightField";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Work from "@/components/sections/Work";


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
      </main>
      <Footer />
    </>
  );
}
