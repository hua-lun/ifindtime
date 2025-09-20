import { create } from "zustand";

interface AppState {
  timeFormat: string;
  updateTimeFormat: (format: string) => void;
}

export const useBearStore = create<AppState>()((set) => ({
  timeFormat: "en-US",
  updateTimeFormat: () =>
    set((state) => ({
      timeFormat: state.timeFormat == "en-US" ? "en-GB" : "en-US",
    })),
}));
