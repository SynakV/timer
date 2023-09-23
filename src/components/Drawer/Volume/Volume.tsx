import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DEFAULT_VOLUME,
  LOCAL_STORAGE_VOLUME,
} from "@/utils/constants/constants";

export const Volume = () => {
  const handleVolumeChange = (volume: number[]) => {
    localStorage.setItem(LOCAL_STORAGE_VOLUME, volume[0].toString());
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Slider
            max={1}
            step={0.05}
            onValueChange={handleVolumeChange}
            className="absolute volume bottom-5"
            defaultValue={[
              +(localStorage.getItem(LOCAL_STORAGE_VOLUME) || DEFAULT_VOLUME),
            ]}
          />
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Volume</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
