import { NavItem } from "./types";

export const NAV_ITEMS: NavItem[] = [
  {
    title: "대시보드",
    href: "/",
    icon: "LayoutDashboard",
    roles: ["ADMIN", "USER", "GUEST"],
  },
  {
    title: "상암 조직도",
    href: "/org",
    icon: "Users",
    roles: ["ADMIN", "USER"],
  },
  {
    title: "예배 관리",
    href: "/worship",
    icon: "BookOpen",
    roles: ["ADMIN", "USER"],
  },
  {
    title: "교육 관리",
    href: "/education",
    icon: "GraduationCap",
    roles: ["ADMIN", "USER"],
  },
  {
    title: "전도 관리",
    href: "/evangelism",
    icon: "UserPlus",
    roles: ["ADMIN", "USER"],
  },
  {
    title: "회계 관리",
    href: "/accounting",
    icon: "Calculator",
    roles: ["ADMIN"],
  },
  {
    title: "심방 관리",
    href: "/visitation",
    icon: "Heart",
    roles: ["ADMIN", "USER"],
  },
];
