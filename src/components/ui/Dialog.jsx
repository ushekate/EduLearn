import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// Base components
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

// Overlay
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

// Title (✅ ADDED)
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

// Content
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 left-1/2 top-1/2 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-6 shadow-xl outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      {children}
      <DialogClose className="absolute top-4 right-4 rounded-md text-muted-foreground transition-opacity hover:opacity-100 focus:outline-none">
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </DialogClose>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

// Export all
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogTitle, // ✅ EXPORTING DialogTitle
};




















// import * as React from "react";
// import * as DialogPrimitive from "@radix-ui/react-dialog";
// import { X } from "lucide-react";
// import { cn } from "@/lib/utils";

// // Base components
// const Dialog = DialogPrimitive.Root;
// const DialogTrigger = DialogPrimitive.Trigger;
// const DialogClose = DialogPrimitive.Close;

// // Overlay
// const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
//   <DialogPrimitive.Overlay
//     ref={ref}
//     className={cn(
//       "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity",
//       className
//     )}
//     {...props}
//   />
// ));
// DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

// // Content
// const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
//   <DialogPrimitive.Portal>
//     <DialogOverlay />
//     <DialogPrimitive.Content
//       ref={ref}
//       className={cn(
//         "fixed z-50 left-1/2 top-1/2 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-6 shadow-xl outline-none focus-visible:ring-2 focus-visible:ring-ring",
//         className
//       )}
//       {...props}
//     >
//       {children}
//       <DialogClose className="absolute top-4 right-4 rounded-md text-muted-foreground transition-opacity hover:opacity-100 focus:outline-none">
//         <X className="h-5 w-5" />
//         <span className="sr-only">Close</span>
//       </DialogClose>
//     </DialogPrimitive.Content>
//   </DialogPrimitive.Portal>
// ));
// DialogContent.displayName = DialogPrimitive.Content.displayName;

// export {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogClose
// };
