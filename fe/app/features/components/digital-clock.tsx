"use client";

import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Select, SelectItem } from "@heroui/select";
import { useBearStore } from "../state/use-app-state";

export const countries = [
  { key: "Asia/Singapore", label: "Singapore" },
  { key: "Europe/Oslo", label: "Oslo" },
];

export default function DigitalClock() {
  const { timeFormat } = useBearStore();
  const [tz, setTz] = useState("Asia/Singapore");

  const [time, setTime] = useState(DateTime.now());

  const getTimeInTimeZone = (timeZone: string) => {
    return DateTime.now()
      .setLocale(timeFormat)
      .setZone(timeZone)
      .toLocaleString(DateTime.TIME_WITH_SECONDS);
  };

  const changeTimeZone = (selectedTimeZone: string) => {
    console.log(selectedTimeZone);
    setTz(selectedTimeZone);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(DateTime.now());
    });
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 content-around gap-2 sm:gap-4">
      <span className="text-center text-2xl sm:text-9xl">
        {getTimeInTimeZone(tz)}
      </span>

      <span>{tz}</span>

      <div>
        <Select
          className="max-w-xs"
          label="Select country"
          onSelectionChange={(selected) =>
            changeTimeZone(selected.currentKey as string)
          }
        >
          {countries.map((country) => (
            <SelectItem key={country.key}>{country.label}</SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
