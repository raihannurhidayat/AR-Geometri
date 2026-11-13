import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1.5 font-bold tracking-tight whitespace-nowrap transition-all select-none border-2 border-border shadow-[2px_2px_0px_#1E293B]",
  {
    variants: {
      variant: {
        default:
          "rounded-full bg-primary text-primary-foreground",
        secondary:
          "rounded-full bg-secondary text-white",
        outline:
          "rounded-full bg-card text-foreground",
        destructive:
          "rounded-full bg-destructive text-white",
        yellow:
          "rounded-full bg-tertiary text-foreground",
        mint:
          "rounded-full bg-quaternary text-foreground",
        violet:
          "rounded-full bg-accent text-white",
        pink:
          "rounded-full bg-secondary text-white",
        sticker:
          "rounded-lg bg-white text-foreground shadow-[2px_2px_0px_#1E293B] uppercase tracking-wider",
      },
      size: {
        default: "h-6 px-3 text-[11px]",
        sm: "h-5 px-2 text-[10px]",
        lg: "h-7.5 px-3.5 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, size }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
