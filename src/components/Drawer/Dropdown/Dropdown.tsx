import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Time } from "./Time/Time";
import { Theme } from "./Theme/Theme";
import { Upload } from "./Upload/Upload";
import SettingsSvg from "@/Icons/SettingsSvg";
import { Button } from "@/components/ui/button";

export const Dropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="absolute bottom-12 right-5">
          <SettingsSvg />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="left"
        sideOffset={10}
        collisionPadding={{ bottom: 47 }}
      >
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Time />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Upload />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Theme />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
