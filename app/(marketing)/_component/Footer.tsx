import React from 'react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <div className='flex items-center p-6 w-full bg-background dark:bg-[#1f1f1f] z-50'>
      <Logo />
      <div className='md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground'>
        <Button variant='link' size='sm'>
          Privacy Policy
        </Button>
        <Button variant='link' size='sm'>
          Terms & Condition
        </Button>
      </div>
    </div>
  );
};

export default Footer;
