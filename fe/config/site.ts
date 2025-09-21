import { Calculator } from "lucide-react";
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "ifindtime",
  description: "Find time, timezones no problem",
  navItems: [
    {
      type: "link",
      label: "Home",
      href: "/",
    },
    {
      type: "dropdown",
      label: "Tools",
      items: [
        {
          label: "Count Days",
          href: "/tools/countdays",
          desc: "Count the number of days between today and specified date",
          icon: Calculator,
        },
      ],
    },
    { type: "link", label: "About", href: "/about" },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Count Days",
      href: "/tools/countdays",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/hua-lun",
  },
};
