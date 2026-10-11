"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface DropdownMenuItemProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  destructive?: boolean;
}

export function DropdownMenuItem({
  label,
  icon,
  onClick,
  disabled,
  destructive,
}: DropdownMenuItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex w-full items-center gap-2 px-3 py-2 text-sm text-left transition-colors",
        "hover:bg-accent focus:outline-none focus:bg-accent",
        disabled && "opacity-50 pointer-events-none",
        destructive && "text-destructive focus:text-destructive"
      )}
    >
      {icon && <span className="h-4 w-4">{icon}</span>}
      {label}
    </button>
  );
}

export function DropdownMenuSection({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div>
      {title && (
        <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </div>
      )}
      <div className="py-1">{children}</div>
    </div>
  );
}

export function DropdownMenuDivider() {
  return <hr className="h-px my-1 bg-border border-0" />;
}