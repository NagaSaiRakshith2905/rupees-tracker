"use client";

import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useAuth,
  useUser,
} from "@clerk/nextjs";
import { Suspense } from "react";
import { Button } from "./ui/button";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { isLoaded } = useAuth();
  const { user } = useUser();

  if (!isLoaded) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuSkeleton className="h-12" />
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }
  const getAvatarFallback = (text: string) => {
    if (!text) return "RT";
    return text
      ?.split(" ")
      .map((a) => a[0])
      .join("");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Suspense>
          <SignedIn>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.imageUrl} alt={"image"} />
                    <AvatarFallback className="rounded-lg">
                      {getAvatarFallback(user?.fullName as string)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium capitalize">
                      {user?.fullName}
                    </span>
                    <span className="text-muted-foreground truncate text-xs">
                      {user?.emailAddresses[0]?.emailAddress}
                    </span>
                  </div>
                  <IconDotsVertical className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user?.imageUrl} alt={"image"} />
                      <AvatarFallback className="rounded-lg">
                        {getAvatarFallback(user?.fullName as string)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium capitalize">
                        {user?.fullName}
                      </span>
                      <span className="text-muted-foreground truncate text-xs">
                        {user?.emailAddresses[0]?.emailAddress}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <IconUserCircle />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconCreditCard />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconNotification />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <SignOutButton>
                  <DropdownMenuItem>
                    <IconLogout />
                    Log out
                  </DropdownMenuItem>
                </SignOutButton>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>
          <SignedOut>
            <SidebarMenuButton
              asChild
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Button asChild>
                <SignInButton>Sign In</SignInButton>
              </Button>
            </SidebarMenuButton>
          </SignedOut>
        </Suspense>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
