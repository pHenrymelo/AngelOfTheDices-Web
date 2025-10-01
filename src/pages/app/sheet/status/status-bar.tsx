import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const bgVariants = cva('w-full rounded-sm h-8 relative', {
  variants: {
    variant: {
      hp: 'bg-red-900/40',
      san: 'bg-blue-900/40',
      ep: 'bg-emerald-900/40',
    },
  },
  defaultVariants: {
    variant: 'hp',
  },
});

const indicatorVariants = cva('w-full rounded-sm h-8', {
  variants: {
    variant: {
      hp: 'bg-red-900',
      san: 'bg-blue-900',
      ep: 'bg-emerald-900',
    },
  },
  defaultVariants: {
    variant: 'hp',
  },
});

export interface StatusBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bgVariants> {
  current: number;
  max: number;
  label: string;
  onCurrentChange?: (newCurrent: number) => void;
}

export function StatusBar({
  className,
  variant,
  current,
  max,
  label,
  onCurrentChange,
  ...props
}: StatusBarProps) {
  const percentage = (current / max) * 100;

  function handleIncrement() {
    if (onCurrentChange) {
      onCurrentChange(Math.min(max, current + 1));
    }
  }

  function handleDecrement() {
    if (onCurrentChange) {
      onCurrentChange(Math.max(0, current - 1));
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold text-xl font-heading">{label}</span>
      <div className="flex items-center gap-3">
        <Button size={'icon'} variant={'ghost'} onClick={handleDecrement}>
          <ChevronLeft className="size-5" />
        </Button>
        <div className={cn(bgVariants({ variant, className }))} {...props}>
          <div
            className={cn(indicatorVariants({ variant }))}
            style={{ width: `${percentage}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-semibold text-xl font-number">
              {current}/{max}
            </span>
          </div>
        </div>
        <Button size={'icon'} variant={'ghost'} onClick={handleIncrement}>
          <ChevronRight className="size-5" />
        </Button>
      </div>
    </div>
  );
}
