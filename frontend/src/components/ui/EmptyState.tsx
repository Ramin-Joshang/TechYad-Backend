import * as React from "react";
import { cn } from "@/lib/utils";
import { FolderSearch } from "lucide-react";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ className, icon, title, description, action, ...props }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 md:p-12 text-center bg-white rounded-3xl border border-gray-100", className)} {...props}>
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-400">
        {icon || <FolderSearch className="w-10 h-10" />}
      </div>
      {title && <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>}
      {description && <p className="text-gray-500 max-w-sm mx-auto mb-6 leading-relaxed">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}
