import { useTheme } from "next-themes";
import { Button } from "../../ui/button";

export const Theme = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className="width-[100%] absolute bottom-12 left-5"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      Theme
    </Button>
  );
};
