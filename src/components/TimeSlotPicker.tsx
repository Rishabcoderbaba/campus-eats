import { TimeSlot } from '@/lib/types';
import { timeSlots } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface TimeSlotPickerProps {
  selected: string | null;
  onSelect: (slot: string) => void;
}

export function TimeSlotPicker({ selected, onSelect }: TimeSlotPickerProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {timeSlots.map((slot) => (
        <button
          key={slot.id}
          onClick={() => slot.available && onSelect(slot.time)}
          disabled={!slot.available}
          className={cn(
            'p-3 rounded-lg border text-sm font-medium transition-all',
            selected === slot.time
              ? 'bg-primary text-primary-foreground border-primary'
              : slot.available
              ? 'bg-card border-border hover:border-primary/50 hover:bg-accent'
              : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
          )}
        >
          {slot.time}
        </button>
      ))}
    </div>
  );
}
