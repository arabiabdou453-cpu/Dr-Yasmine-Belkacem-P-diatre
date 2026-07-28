import type { ReactElement } from "react";

export type IconName =
  | "bear"
  | "whatsapp"
  | "calendar"
  | "phone"
  | "shield"
  | "users"
  | "clock"
  | "heart"
  | "stethoscope"
  | "syringe"
  | "lungs"
  | "baby"
  | "brain"
  | "pin"
  | "mail"
  | "user"
  | "age"
  | "reason"
  | "date"
  | "time"
  | "bell"
  | "chat";

interface IconProps {
  readonly name: IconName;
  readonly size?: number;
}

const paths: Record<IconName, string> = {
  bear: "M12 5.5a6.5 6.5 0 0 0-6.5 6.5V18h13v-6A6.5 6.5 0 0 0 12 5.5M7 7 5 4l-1 3m13 0 2-3 1 3M9 12h.01M15 12h.01M10 15c1.3.8 2.7.8 4 0",
  whatsapp:
    "M20 11.8a8 8 0 0 1-11.8 7L4 20l1.3-4.1A8 8 0 1 1 20 11.8M9 8.5c.2-.5.4-.5.7-.5h.4c.2 0 .4.1.5.4l.8 1.8c.1.2 0 .4-.1.6l-.5.6c.6 1.1 1.5 2 2.7 2.5l.6-.6c.2-.2.4-.2.6-.1l1.7.8c.3.1.4.3.4.5v.4c0 .3-.2.5-.5.7-1 .4-2.8.1-4.7-1.7-1.9-1.9-2.3-3.6-1.9-4.7",
  calendar: "M5 4h14v15H5zM8 2v4m8-4v4M5 9h14m-9 4h4m-4 3h4",
  phone:
    "M7 3h3l1.2 4-2 1.4a14 14 0 0 0 6.4 6.4l1.4-2 4 1.2v3c0 1.1-.9 2-2 2C10.2 19 5 13.8 5 7c0-1.1.9-2 2-2",
  shield: "M12 3 19 6v5c0 4.3-2.9 8.1-7 10-4.1-1.9-7-5.7-7-10V6zM9 12l2 2 4-4",
  users:
    "M16 19v-1.5A3.5 3.5 0 0 0 12.5 14h-5A3.5 3.5 0 0 0 4 17.5V19m6-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6m8 3a3 3 0 0 0-2-5.7",
  clock: "M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16m0 4v5l3 2",
  heart:
    "M20 8.5C20 14 12 19 12 19S4 14 4 8.5C4 5.8 7.1 4 9.5 6.3L12 8.7l2.5-2.4C16.9 4 20 5.8 20 8.5",
  stethoscope:
    "M6 4v5a4 4 0 0 0 8 0V4m-8 0h2m4 0h2m-4 9v2a4 4 0 0 0 8 0v-1m0 0a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0",
  syringe: "m5 19 14-14m-9-1 4 4m-8 4 4 4m-5 4 3 3m8-12 2 2m-5 5 2 2",
  lungs: "M12 6v6m0-6c-2-3-4-2-5 1l-2 6c-.8 3 3 4 5 1l2-2m0-6c2-3 4-2 5 1l2 6c.8 3-3 4-5 1l-2-2",
  baby: "M8 9a4 4 0 1 1 8 0v3a4 4 0 1 1-8 0zm2 2h.01m4 0h.01m-3 3h2m-6-8c1-2 3-3 5-3m2 1 2 2",
  brain:
    "M12 5a3 3 0 0 0-5 2 3 3 0 0 0-2 5 3 3 0 0 0 3 5 3 3 0 0 0 4 2m0-14a3 3 0 0 1 5 2 3 3 0 0 1 2 5 3 3 0 0 1-3 5 3 3 0 0 1-4 2m0-13v14M9 9h3m0 4h3",
  pin: "M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11m0-9a2 2 0 1 0 0-4 2 2 0 0 0 0 4",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  user: "M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-6 7a6 6 0 0 1 12 0",
  age: "M7 4v3m10-3v3M5 8h14v11H5zm3 4h8m-8 3h5",
  reason: "M6 4h12v16H6zm3 5h6m-6 4h6m-6 4h4",
  date: "M5 5h14v14H5zm3-3v6m8-6v6M5 10h14",
  time: "M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16m0 4v5l3 2",
  bell: "M6 17h12l-1.5-2v-4a4.5 4.5 0 0 0-9 0v4zm4 3h4",
  chat: "M5 5h14v10H9l-4 4z",
};

export function Icon({ name, size = 22 }: IconProps): ReactElement {
  return (
    <svg
      className={`icon icon-${name}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
