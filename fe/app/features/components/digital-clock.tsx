"use client";

import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Select, SelectItem } from "@heroui/select";
import { useBearStore } from "../state/use-app-state";
import raw_timezones from "../../static/raw-timezones.json";
import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
} from "@heroui/autocomplete";
import {
  formatString,
  getTimezones,
  joinStringArray,
} from "../utils/clock-utils";

// export const countries = [
//   { key: "Asia/Singapore", label: "Singapore" },
//   { key: "Europe/Oslo", label: "Oslo" },
// ];

// const ary = Intl.supportedValuesOf("timeZone");
// export const tzCountries = getTimezones(ary);

export default function DigitalClock() {
  const { timeFormat } = useBearStore();
  const [tz, setTz] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const [time, setTime] = useState(DateTime.now());

  const getTimeInTimeZone = (
    timeZone: string,
    formatOptions: Intl.DateTimeFormatOptions
  ) => {
    const dt = DateTime.now()
      .setLocale(timeFormat)
      .setZone(timeZone)
      .toLocaleString(formatOptions);

    if (timeFormat == "en-US") {
      const dtArr = dt.split(" ");
      return (
        <div>
          <span className="font-mono text-center text-5xl sm:text-9xl">
            {dtArr[0]}
          </span>
          <span className="text-center text-2xl sm:text-6xl"> {dtArr[1]}</span>
        </div>
      );
    } else {
      return (
        <span className="font-mono text-center text-5xl sm:text-9xl">{dt}</span>
      );
    }
  };

  const getDate = (timeZone: string) => {
    const dt = DateTime.now()
      .setZone(timeZone)
      .setLocale("en-SG")
      .toLocaleString(DateTime.DATE_HUGE);

    const dtArr = dt.split(" ");
    const output = "{0}, {1}";
    return dt;
    // return formatString(
    //   output,
    //   dtArr[0],
    //   joinStringArray(dtArr, 1, dtArr.length)
    // );
  };

  const changeTimeZone = (selectedTimeZone: string) => {
    setTz(selectedTimeZone);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(DateTime.now());
    });
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 content-stretch gap-2 sm:gap-4">
      {getTimeInTimeZone(tz, DateTime.TIME_WITH_SECONDS)}

      <div className="inline-block text-center justify-center">
        {/* <span className={title({ color: "yellow", size: "home" })}>It is </span> */}
        <span className="text-center text-lg sm:text-4xl font-light">
          {getDate(tz)}
        </span>
      </div>

      <span>{tz}</span>

      <div>
        <div>
          <Autocomplete
            className="max-w-xs"
            defaultItems={raw_timezones}
            label="Country's Timezone"
            placeholder="Search for a country"
          >
            {(item) => (
              <AutocompleteItem
                onClick={() => changeTimeZone(item.name)}
                key={item.name}
              >
                {item.countryName}
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>
      </div>
    </div>
  );
}
