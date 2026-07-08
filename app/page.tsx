import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { FeaturedDishes } from "@/components/featured-dishes";
import { WhyChooseUs } from "@/components/why-choose-us";
import { About } from "@/components/about";
import { Reviews } from "@/components/reviews";
import { Gallery } from "@/components/gallery";
import { Hours } from "@/components/hours";
import { Contact } from "@/components/contact";
import { MapPlaceholder } from "@/components/map-placeholder";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <FeaturedDishes />
      <WhyChooseUs />
      <About />
      <Reviews />
      <Gallery />
      <Hours />
      <Contact />
      <MapPlaceholder />
      <Footer />
    </main>
  );
}
