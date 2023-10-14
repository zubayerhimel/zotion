import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Heading = () => {
  return (
    <div className='max-w-3xl space-y-4'>
      <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
        Your Ideas, Documents & Plans unified. Welcome to <span className='underline'>Zotion</span>
      </h1>
      <h3 className='text-base sm:text-xl md:text-2xl font-medium'>Zotion is a connected workspace magic happens better, faster</h3>
      <Button>
        Get Started <ArrowRight className='h-4 w-4 ml-2' />
      </Button>
    </div>
  );
};

export default Heading;
