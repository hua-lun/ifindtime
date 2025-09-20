"use client";

import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Select, SelectItem } from "@heroui/select";
import { useBearStore } from "../state/use-app-state";
import timezones from "../../static/timezones.json";
import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
} from "@heroui/autocomplete";

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
      <span className="text-center text-5xl sm:text-9xl">
        {getTimeInTimeZone(tz)}
      </span>

      <span>{tz}</span>

      <div>
        {/* <Select
          className="max-w-xs"
          label="Select country"
          onSelectionChange={(selected) =>
            changeTimeZone(selected.currentKey as string)
          }
        >
          {timezones.map((timezone) => (
            <SelectItem key={timezone.utc[0]}>{timezone.text}</SelectItem>
          ))}
        </Select> */}
        <div>
          <Autocomplete
            className="max-w-xs"
            defaultItems={timezones}
            label="Country's Timezone"
            placeholder="Search for a country"
          >
            {(item) => (
              <AutocompleteItem
                onClick={() => changeTimeZone(item.utc[0])}
                key={item.value}
              >
                {item.text}
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>
      </div>
    </div>
  );
}
