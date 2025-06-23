"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { ReactNode } from "react";

export function AppSidebarClient({ children }: { children: ReactNode }) {
  // We are using this useIsMobile hook to determine if the screen is mobile or not, that is how shadcn also determine the mobile screen size
  const isMobile = useIsMobile();

  //If the screen is not mobile, this client componet will do nothing, only if the screen size is  mobile screen (the shadcn sidebar will vanish anyways), we will show a navbar with a button that will open the sidebar
  if (isMobile) {
    return (
      <div className="flex flex-col w-full">
        <div className="p-2 border-b flex items-center gap-1">
          <SidebarTrigger />
          <span className="text-xl">WDS Jobs</span>
        </div>
        <div className="flex-1 flex">{children}</div>
      </div>
    );
  }

  return children;
}

// Q: Why are we using client component for this??

// You must use a client component when you need interactivity — like clicking a button that opens/collapses a sidebar —
// because server components don’t run in the browser and can't handle browser-side behavior like onClick, useState, useEffect, etc.

// In your case:
//  *  The SidebarTrigger presumably relies on client-side state or logic to open/close the sidebar.

//  *  Your useIsMobile hook likely uses window.innerWidth or a media query — both of which require the browser (i.e. they don’t exist during server rendering).

//  *  So you wrapped it in a use client component (AppSidebarClient) to enable this interactivity.
