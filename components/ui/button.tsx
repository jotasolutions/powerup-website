'use client'

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils";
import { DotWave } from 'ldrs/react'
import 'ldrs/react/DotWave.css'

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap hover:cursor-pointer text-sm  transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive  backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.06)] active:brightness-95 h-9 px-4 py-2   gap-2",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-b from-[color-mix(in_oklch,var(--primary)_88%,white)] to-primary text-primary-foreground hover:bg-primary/90  hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.12)] hover:brightness-110 active:shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]",
        destructive:
          "bg-destructive dark:bg-transparent text-destructive-foreground hover:bg-destructive/90  dark:text-destructive dark:hover:bg-destructive/90 dark:hover:text-destructive-foreground",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground dark:bg-transparent dark:text-white dark:border-white/70 shadow-none",
        secondary:
          "bg-primary/10 text-primary hover:bg-secondary/80 shadow-none",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:text-gray-300 dark:hover:bg-gray-800 border-none shadow-none",
        link: "text-primary underline-offset-4 hover:underline shadow-none",
        whatsapp: "bg-gradient-to-b from-green-400 via-green-500 to-green-600 text-white hover:from-green-500 hover:to-green-600 ",
   
        inverted: "bg-white text-primary hover:bg-white/80",
        success: "bg-green-500 text-white hover:bg-green-600",
        secondaryDestructive: "bg-destructive/10 text-destructive shadow-none hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-md",
        sm: "h-9 rounded-md px-3",
        xs: "h-8 rounded-md px-2 text-xs",
        lg: "h-11 rounded-lg px-8",
        icon: "h-10 w-10 p-0 rounded-md",
        link: "p-0"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    if (isLoading) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
          disabled={true}
        >


          <DotWave
            size="42"
            speed="1"
            color="white"
          />
        </Comp>
      )
    } else {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      )
    }

  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
