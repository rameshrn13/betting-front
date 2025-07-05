import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 button-hover pixel-corners",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary via-primary to-primary text-primary-foreground shadow hover:glow",
        destructive:
          "bg-gradient-to-r from-destructive via-destructive to-destructive text-destructive-foreground shadow-sm hover:glow-secondary",
        outline:
          "border-2 border-primary bg-transparent shadow-sm hover:bg-primary/10 hover:glow",
        secondary:
          "bg-gradient-to-r from-secondary via-secondary to-secondary text-secondary-foreground shadow-sm hover:glow-secondary",
        accent:
          "bg-gradient-to-r from-accent via-accent to-accent text-accent-foreground shadow-sm hover:glow-accent",
        ghost: "hover:bg-accent/10 hover:text-accent hover:glow-accent",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-14 rounded-lg px-8 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };