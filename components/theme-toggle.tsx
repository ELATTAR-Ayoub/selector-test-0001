"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <Button
      variant="outline"
      size="default"
      onClick={toggleTheme}
      className="gap-2"
    >
      {theme === "light" ? (
        <>
          <Sun className="h-4 w-4" />
          Light Mode
        </>
      ) : (
        <>
          <Moon className="h-4 w-4" />
          Dark Mode
        </>
      )}
    </Button>
  );
}
