import * as React from "react";

import {
  IconCategory,
  IconChartPie,
  IconCoinRupeeFilled,
  IconHelp,
  IconHome,
  IconPigMoney,
  IconSearch,
  IconSettings,
  IconStack2,
  IconTransactionRupee,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: <IconHome className="!size-5 -ml-0.5" />,
    },
    {
      title: "Accounts",
      url: "/accounts",
      icon: <IconStack2 className="!size-5 -ml-0.5" />,
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: <IconTransactionRupee className="!size-5 -ml-0.5" />,
    },
    {
      title: "Categories",
      url: "/categories",
      icon: <IconCategory className="!size-5 -ml-0.5" />,
    },
    {
      title: "Budget",
      url: "/budget",
      icon: <IconPigMoney className="!size-5 -ml-0.5" />,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: <IconChartPie className="!size-5 -ml-0.5" />,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/",
      icon: <IconSettings className="!size-5 -ml-0.5" />,
    },
    {
      title: "Get Help",
      url: "/",
      icon: <IconHelp className="!size-5 -ml-0.5" />,
    },
    {
      title: "Search",
      url: "/",
      icon: <IconSearch className="!size-5 -ml-0.5" />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="sidebar" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 [&>svg]:size-7"
            >
              <Link href="/">
                <IconCoinRupeeFilled className="!size-7 -ml-[4px]" />
                <span className="text-base font-semibold">Rupees Tracker</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
