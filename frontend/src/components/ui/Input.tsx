import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <div className="relative">
          {icon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            className={cn(
              "flex w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
              icon && "pr-10",
              error && "border-red-500 focus:ring-red-500",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && <span className="text-xs font-medium text-red-500">{error}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
