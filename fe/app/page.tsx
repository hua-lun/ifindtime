"use client";

import { title } from "@/components/primitives";
import DigitalClock from "./features/components/digital-clock";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);
  return (
    <section className="flex flex-col items-center justify-center pt-16 gap-4 py-8 md:py-10">
      <div className="inline-block text-center justify-center">
        <span className={title({ color: "pink" })}>Time now:</span>
        <br />

        <DigitalClock />
      </div>
    </section>
  );
}
