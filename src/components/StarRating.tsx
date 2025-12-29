import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md';
}

export function StarRating({ rating, onRate, readonly = false, size = 'md' }: StarRatingProps) {
  const [hovered, setHovered] = useState(0);

  const starSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = readonly ? star <= rating : star <= (hovered || rating);
        
        return (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => onRate?.(star)}
            onMouseEnter={() => !readonly && setHovered(star)}
            onMouseLeave={() => !readonly && setHovered(0)}
            className={cn(
              'transition-colors',
              readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110 transition-transform'
            )}
          >
            <Star
              className={cn(
                starSize,
                filled
                  ? 'fill-warning text-warning'
                  : 'fill-transparent text-muted-foreground/40'
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
