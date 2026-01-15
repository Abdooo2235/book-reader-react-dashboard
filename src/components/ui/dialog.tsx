import * as React from "react";
import { cn } from "@/lib/utils";

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue | undefined>(undefined);

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open = false, onOpenChange, children }: DialogProps) {
  return (
    <DialogContext.Provider value={{ open, onOpenChange: onOpenChange || (() => { }) }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({
  children,
  asChild
}: {
  children: React.ReactNode;
  asChild?: boolean
}) {
  const context = React.useContext(DialogContext);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
      onClick: () => context?.onOpenChange(true),
    });
  }

  return (
    <button onClick={() => context?.onOpenChange(true)}>
      {children}
    </button>
  );
}

export function DialogContent({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string
}) {
  const context = React.useContext(DialogContext);

  if (!context?.open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => context.onOpenChange(false)}
      />

      {/* Dialog Content */}
      <div
        className={cn(
          "relative z-50 bg-background rounded-lg shadow-lg w-full max-w-lg mx-4 p-6 border",
          className
        )}
      >
        {children}

        {/* Close button */}
        <button
          onClick={() => context.onOpenChange(false)}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export function DialogHeader({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string
}) {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  );
}

export function DialogTitle({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string
}) {
  return (
    <h2 className={cn("text-lg font-semibold", className)}>
      {children}
    </h2>
  );
}

export function DialogDescription({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string
}) {
  return (
    <p className={cn("text-sm text-muted-foreground mt-2", className)}>
      {children}
    </p>
  );
}

export function DialogFooter({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string
}) {
  return (
    <div className={cn("flex justify-end gap-2 mt-6", className)}>
      {children}
    </div>
  );
}
