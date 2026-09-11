import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn("flex space-x-2 space-x-reverse border-b border-gray-100", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "px-4 py-3 text-sm font-bold border-b-2 transition-colors",
            activeTab === tab.id
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
