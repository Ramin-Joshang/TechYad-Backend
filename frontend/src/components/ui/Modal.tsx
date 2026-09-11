import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, footer, className }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={cn(
        "relative w-full max-w-lg bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col max-h-[90vh]",
        className
      )}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
        
        {footer && (
          <div className="p-6 border-t border-gray-100 bg-gray-50/50 rounded-b-3xl shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
