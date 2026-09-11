import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: { label: string; href?: string }[];
}

export function Breadcrumb({ items, className, ...props }: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center text-sm font-medium", className)} {...props}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={index} className="flex items-center">
            {item.href && !isLast ? (
              <Link href={item.href} className="text-gray-500 hover:text-blue-600 transition">
                {item.label}
              </Link>
            ) : (
              <span className={cn(isLast ? "text-gray-900 font-bold" : "text-gray-500")}>
                {item.label}
              </span>
            )}
            
            {!isLast && (
              <ChevronLeft className="w-4 h-4 mx-2 text-gray-300" />
            )}
          </div>
        );
      })}
    </nav>
  );
}
