import { useTheme } from "next-themes";

export const Theme = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="w-[100%]"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      Theme
    </div>
  );
};
