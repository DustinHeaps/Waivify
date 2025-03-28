"use client";

import { useEffect } from "react";

export function TallyScript() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV !== "production"
    ) {
      const script = document.createElement("script");
      script.src = "https://tally.so/widgets/embed.js";
      script.async = true;
      script.onload = () => {
        console.log("Tally loaded");
      };
      document.body.appendChild(script);
    }
  }, []);

  return null;
}
