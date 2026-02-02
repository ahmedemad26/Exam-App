
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/tailwind-cn";
import { Loader } from "lucide-react";


const buttonVariants = cva(
  "inline-flex items-center   justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-gray-400 disable:text-gray-400 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        destructive:
          "bg-red-600 text-white hover:bg-red-700",
        outline:
          "border border-blue-600 bg-blue-50  hover:bg-blue-100",
        secondary:
          "bg-gray-200  hover:bg-gray-300",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // My Colors
        blue: "bg-blue-600 text-white ",
        darkBlue: "bg-blue-700 text-white ",
        red: "bg-red-600 text-white hover:bg-red-700",
        gray: "bg-gray-200 text-gray-700 hover:bg-gray-300",
        grayOutline:
          "border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50",
        blueOutline:
          "border-2 border-blue-500 bg-transparent text-blue-500 hover:bg-blue-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9  px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
        // My custom button
        custom: "h-[46px] w-[217px]",
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
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {loading ? <Loader className="text-gray-400 animate-spin size-4 animate-5" /> : children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
