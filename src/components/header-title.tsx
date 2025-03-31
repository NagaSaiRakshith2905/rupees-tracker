"use client";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

export default function HeaderTitle() {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathNames.length === 0 && (
          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize font-semibold">
              Dashboard
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}
        {pathNames.length > 0 &&
          pathNames.map((path, index) => {
            const href = `/${pathNames.slice(0, index + 1).join("/")}`;
            if (index !== pathNames.length - 1) {
              return (
                <>
                  <BreadcrumbItem key={path}>
                    <BreadcrumbLink href={href} className="capitalize">
                      {path}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              );
            } else {
              return (
                <BreadcrumbItem key={path}>
                  <BreadcrumbPage className="capitalize font-semibold">
                    {path}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              );
            }
          })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
