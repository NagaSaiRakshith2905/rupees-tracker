import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ReactNode } from "react";
import ActiveSidebarButton from "./active-sidebar-button";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: ReactNode;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <ActiveSidebarButton item={item} />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
