import { cva, type VariantProps } from 'class-variance-authority';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const bgVariants = cva('w-full rounded-sm h-8 relative', {
  variants: {
    variant: {
      hp: 'bg-red-900/40',
      san: 'bg-blue-900/40',
      ep: 'bg-emerald-900/40',
      dp: 'bg-cyan-700/40',
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
      dp: 'bg-cyan-700',
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
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(current.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.select();
    }
  }, [isEditing]);

  useEffect(() => {
    if (!isEditing) {
      setInputValue(current.toString());
    }
  }, [current, isEditing]);

  const percentage = max > 0 ? (current / max) * 100 : 0;

  function handleIncrement(value: number) {
    const newValue = Math.min(max, current + value);
    if (onCurrentChange) {
      onCurrentChange(newValue);
    }
  }

  function handleDecrement(value: number) {
    const newValue = Math.max(0, current - value);
    if (onCurrentChange) {
      onCurrentChange(newValue);
    }
  }

  function handleSave() {
    setIsEditing(false);
    const newValue = parseInt(inputValue, 10);
    if (!Number.isNaN(newValue) && onCurrentChange && newValue !== current) {
      const clampedValue = Math.max(0, Math.min(max, newValue));
      onCurrentChange(clampedValue);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') handleSave();
    if (event.key === 'Escape') setIsEditing(false);
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold text-xl font-heading">{label}</span>
      <div className="flex items-center gap-3">
        <div className="flex">
          <Button
            size={'icon'}
            variant={'ghost'}
            onClick={() => handleDecrement(5)}
          >
            <ChevronsLeft className="size-5" />
          </Button>
          <Button
            size={'icon'}
            variant={'ghost'}
            onClick={() => handleDecrement(1)}
          >
            <ChevronLeft className="size-5" />
          </Button>
        </div>
        <div className={cn(bgVariants({ variant, className }))} {...props}>
          <div
            className={cn(
              indicatorVariants({ variant }),
              'transition-all duration-300',
            )}
            style={{ width: `${percentage}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center font-semibold text-xl font-number gap-1">
            {isEditing ? (
              <Input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className="w-8 h-full bg-transparent border-0 p-0 text-right focus-visible:ring-0 focus-visible:ring-offset-0"
                style={{ fontSize: '1.25rem' }}
              />
            ) : (
              <span onClick={() => setIsEditing(true)}>{current}</span>
            )}
            <span>/</span>
            <span>{max}</span>
          </div>
        </div>
        <div className="flex">
          <Button
            size={'icon'}
            variant={'ghost'}
            onClick={() => handleIncrement(1)}
          >
            <ChevronRight className="size-5" />
          </Button>
          <Button
            size={'icon'}
            variant={'ghost'}
            onClick={() => handleIncrement(5)}
          >
            <ChevronsRight className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
