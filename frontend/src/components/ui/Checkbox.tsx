import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex items-center gap-2 cursor-pointer group">
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            className="peer sr-only"
            ref={ref}
            {...props}
          />
          <div className={cn(
            "w-5 h-5 border-2 rounded transition-all",
            "border-gray-300 bg-white group-hover:border-blue-500",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2",
            "peer-checked:border-blue-600 peer-checked:bg-blue-600",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            className
          )}></div>
          <Check className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
        </div>
        {label && <span className="text-sm font-medium text-gray-700 peer-disabled:opacity-50">{label}</span>}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
