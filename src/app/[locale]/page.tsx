import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ToursSection from "@/components/ToursSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ToursSection />
      <ReviewsSection />
      <ContactCTA />
      <Footer />
    </>
  );
}
