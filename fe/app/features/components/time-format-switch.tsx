"use client";

import { Clock } from "lucide-react";
import { Switch } from "@heroui/switch";
import { useState } from "react";
import { useBearStore } from "../../features/state/use-app-state";

export default function TimeFormatSwitch() {
  const [format, setFormat] = useState("12");

  const { updateTimeFormat } = useBearStore();
  const changeFormat = () => {
    if (format == "12") {
      updateTimeFormat("fr");
      setFormat("24");
    } else {
      updateTimeFormat("en-US");
      setFormat("12");
    }
  };
  return (
    <div>
      <Switch
        onChange={changeFormat}
        endContent={<Clock />}
        size="lg"
        startContent={<Clock />}
        defaultSelected
        aria-label={format}
      >
        {format}-hour
      </Switch>
    </div>
  );
}
