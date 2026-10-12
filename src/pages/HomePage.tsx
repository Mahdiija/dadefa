import Clients from "@/components/pages/homePage/Clients/ClientsSection";
import Contact from "@/components/pages/homePage/Contact/ContactSection";
import { Hero } from "@/components/pages/homePage/Hero/Hero";
import Products from "@/components/pages/homePage/Products/ProductsSection";
import Retail from "@/components/pages/homePage/Retail/RetailSection";
import DataStory from "@/components/pages/homePage/Story/DataStory";
// import Holding from "@/components/pages/homePage/Holding/Holding";
// import ApplicationsSection from "@/components/pages/homePage/Applications/ApplicationsSection";
// import Technical from "@/components/pages/homePage/Technical/TechnicalSection";
// import Vision from "@/components/pages/homePage/Vision/VisionSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <DataStory />
      {/* <Holding /> */}
      <Products />
      <Clients />
      <Retail />
      {/* <ApplicationsSection /> */}
      {/* <Technical /> */}
      {/* <Vision /> */}
      <Contact />
    </>
  );
}
