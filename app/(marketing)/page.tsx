import Heading from './_component/Heading';
import HeroSection from './_component/HeroSection';

const MarketingPage = () => {
  return (
    <div className='min-h-full flex flex-col'>
      <div className='flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10'>
        <Heading />
        <HeroSection />
      </div>
    </div>
  );
};

export default MarketingPage;
