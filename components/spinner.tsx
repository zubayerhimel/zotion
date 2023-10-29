import { Loader } from 'lucide-react';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const SpinnerVariants = cva('text-muted-background animate-spin', {
  variants: {
    size: {
      default: 'h-4 w-4',
      sm: 'h-2 w-2',
      lg: 'h-6 w-6',
      icon: 'h-10 w-10',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface SpinnerProps extends VariantProps<typeof SpinnerVariants> {}

export const Spinner = ({ size }: SpinnerProps) => <Loader className={cn(SpinnerVariants({ size }))} />;