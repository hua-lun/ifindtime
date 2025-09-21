"use client";
import { title } from "@/components/primitives";
import { Card, CardBody } from "@heroui/card";
import { DatePicker } from "@heroui/date-picker";
import {
  parseDate,
  getLocalTimeZone,
  today,
  CalendarDate,
} from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

export default function DateIntervalInputs() {
  const [startValue, setStartValue] = useState(today(getLocalTimeZone()));

  const [endValue, setEndValue] = useState();

  const [totalDays, setTodayDays] = useState<number>();

  const getFormattedDate = (date: CalendarDate) => {
    return formatter.format(date.toDate(getLocalTimeZone()));
  };

  const getDateTime = (d1: CalendarDate, d2: CalendarDate) => {
    var i1 = DateTime.fromJSDate(d1.toDate(getLocalTimeZone())),
      i2 = DateTime.fromJSDate(d2.toDate(getLocalTimeZone()));
    const temp = i2.diff(i1, ["days"]).toObject();
    return temp.days;
  };
  useEffect(() => {
    if (startValue && endValue) {
      const diffDays = getDateTime(startValue, endValue);

      setTodayDays(diffDays);
    }
  }, [startValue, endValue]);

  let formatter = useDateFormatter({ dateStyle: "short" });

  return (
    <div className="grid grid-rows-2 gap-4 justify-around">
      <div className="flex">
        <Card className="gap-2">
          <CardBody className="gap-2">
            <div className="inline-block text-center justify-center gap-1">
              <span className="font-mono text-center text-2xl sm:text-6xl">
                From {startValue ? getFormattedDate(startValue) : "--"} there
                are, <br />
              </span>
              <span className={title({ color: "pink", size: "home" })}>
                {totalDays ? totalDays : "__"} days <br />
              </span>
              <span className="font-mono text-center text-2xl sm:text-6xl">
                till {endValue ? getFormattedDate(endValue) : "__"}
              </span>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-y-1">
          <DatePicker
            className="max-w-[284px]"
            label="Start Date"
            value={startValue}
            maxValue={today(getLocalTimeZone())}
            onChange={setStartValue as any}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <DatePicker
            className="max-w-[284px]"
            label="End Date"
            value={endValue}
            minValue={today(getLocalTimeZone())}
            onChange={setEndValue as any}
          />
        </div>
      </div>
    </div>
  );
}
