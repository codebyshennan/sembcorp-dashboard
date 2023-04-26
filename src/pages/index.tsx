import LandingPageHeader from '~/components/landing/Header';
import { NextPageWithLayout } from './_app';
import LandingPageFooter from '~/components/landing/Footer';
import LandingPageHero from '~/components/landing/Hero';
import LandingPageTestimonials from '~/components/landing/Testimonials';
import LandingPageCTA from '~/components/landing/CTA';
import LandingPageUseCase from '~/components/landing/UseCase';
import LandingPageAboutUs from '~/components/landing/AboutUs';
import LandingPagePurpose from '~/components/landing/Purpose';

const LandingPage: NextPageWithLayout = () => {
  return (
    <>
      {/* header */}
      <LandingPageHeader />

      {/* hero */}
      <LandingPageHero />

      {/* testimonials */}
      <LandingPageTestimonials />

      {/* usecase */}
      <LandingPageUseCase />

      {/* who we are */}
      <LandingPageAboutUs />

      {/* purpose */}
      <LandingPagePurpose />

      {/* cta */}
      <LandingPageCTA />

      <LandingPageFooter />
    </>
  );
};

export default LandingPage;
