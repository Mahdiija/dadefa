import * as motion from "framer-motion/m";
import { useEffect, useState } from "react";

export function Typewriter({
  text,
  speed = 50,
}: {
  text?: string | null;
  speed?: number;
}) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) {
      setDisplayedText("");
      return;
    }

    const safe_text = String(text);
    const chars = Array.from(safe_text);
    let current_index = 0;

    setDisplayedText("");

    const interval = setInterval(() => {
      current_index++;
      if (current_index <= chars.length) {
        setDisplayedText(chars.slice(0, current_index).join(""));
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  if (!text) return null;

  return (
    <span className="inline-flex items-center">
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="me-1 h-3 w-[2px] bg-current"
      />
    </span>
  );
}
