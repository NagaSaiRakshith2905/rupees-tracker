"use client";
import { usePathname } from "next/navigation";
import { SidebarMenuButton } from "./ui/sidebar";
import Link from "next/link";

export default function ActiveSidebarButton({
  item,
}: {
  item: {
    title: string;
    url: string;
    icon: React.ReactNode;
  };
}) {
  const pathname = usePathname();
  const isActive = item.url === pathname;
  return (
    <SidebarMenuButton tooltip={item.title} isActive={isActive} asChild>
      <Link href={item.url}>
        {item.icon}
        <span>{item.title}</span>
      </Link>
    </SidebarMenuButton>
  );
}
