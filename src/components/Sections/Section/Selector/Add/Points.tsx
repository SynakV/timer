import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  points: number[];
  checked: number[];
  onCheckChange: (point: number) => void;
}

export const Points: FC<Props> = ({ points, checked, onCheckChange }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-full" variant="outline">
          Select points
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <ScrollArea className="h-60 w-full py-1 px-2">
          {points.map((point) => (
            <div key={point} className="flex items-center space-x-2">
              <Checkbox
                value={point}
                checked={checked.includes(point)}
                onCheckedChange={() => onCheckChange(point)}
              />
              <Label htmlFor="terms">{point}</Label>
              <br />
            </div>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
