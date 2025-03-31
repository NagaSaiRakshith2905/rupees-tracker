import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function ToggleSidebarTooltip({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-col">
            <p className="opacity-70 text-xs">Toggle Sidebar</p>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center justify-center gap-1 rounded px-1.5 font-mono text-[12px] font-medium opacity-100">
              <span className="text-xs">⌘</span>b
            </kbd>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
