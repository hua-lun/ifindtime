import { title } from "@/components/primitives";
import DigitalClock from "./features/components/digital-clock";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block text-center justify-center">
        <span className={title({ color: "pink" })}>Time now:</span>
        <br />

        <DigitalClock />
      </div>
    </section>
  );
}
