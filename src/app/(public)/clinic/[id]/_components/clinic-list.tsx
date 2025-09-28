"use client";
import { Button } from "@/components/ui/button";
import { TimeSlot } from "./clinic-content";
import { cn } from "@/lib/utils";
import { isToday, isSlotInThePast, isSlotSequenceAvailable } from "./clinic-utils";

interface ClinicListProps {
  selectedDate: Date;
  selectedTime: string;
  requireSlots: number;
  blockedTimes: string[];
  availableTimeSlots: TimeSlot[];
  clinicTimes: string[];
  onSelectTime: (time: string) => void;
}
export function ClinicList({
  selectedDate,
  selectedTime,
  requireSlots,
  blockedTimes,
  availableTimeSlots,
  clinicTimes,
  onSelectTime,
}: ClinicListProps) {
    // Verifica se a data selecionada é hoje
    const dateIsToday = isToday(selectedDate);
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
      {availableTimeSlots.map((slot) => {

        const sequenceOk = isSlotSequenceAvailable(slot.time, requireSlots, clinicTimes, blockedTimes)

         const slotIsPast = dateIsToday && isSlotInThePast(slot.time).hasPassed;

        const slotEnabled = slot.available && sequenceOk && !slotIsPast;


        return (
          <Button
            onClick={() => slotEnabled && onSelectTime(slot.time)}
            type="button"
            variant="outline"
            key={slot.time}
            className={cn(
              "h-10 select-none cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 hover:bg-gray-300 hover:text-gray-600",
              slot.time === selectedTime &&
                "border-2 border-emerald-500  text-primary bg-emerald-100 hover:bg-emerald-200", 
                !slotEnabled && "opacity-50 cursor-not-allowed",
            )}
            disabled={!slotEnabled}
            
          >
            {slot.time}
          </Button>
        );
      })}
    </div>
  );
}
