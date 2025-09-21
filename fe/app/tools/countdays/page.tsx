import DateIntervalInputs from "@/app/features/components/date-interval-inputs";
import { title } from "@/components/primitives";

export default function CountDaysPage() {
  return (
    <div className="grid grid-rows gap-4 justify-around">
      <div>
        <h1 className={title()}>Count Days</h1>
      </div>
      <div className="inline-block text-center justify-center sm:max-w-xl">
        <DateIntervalInputs />
      </div>
    </div>
  );
}
