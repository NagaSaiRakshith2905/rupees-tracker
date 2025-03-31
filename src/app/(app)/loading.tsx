import { Loader2 } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <span className="animate-spin w-full h-full">
      <Loader2 />
    </span>
  );
}
