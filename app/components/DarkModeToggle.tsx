import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle({ isDark, toggle }: { isDark: boolean; toggle: () => void }) {
  return (
    <button onClick={toggle} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}