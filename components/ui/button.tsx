import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-all duration-200 outline-none select-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "rounded-2xl border-2 border-[#1E293B] bg-[#8B5CF6] text-white font-bold shadow-[3px_3px_0px_#1E293B] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1E293B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#1E293B]",
        candy:
          "rounded-full border-2 border-[#1E293B] bg-[#8B5CF6] text-white font-bold shadow-[4px_4px_0px_#1E293B] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1E293B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#1E293B]",
        candySecondary:
          "rounded-full border-2 border-[#1E293B] bg-white text-[#1E293B] font-bold shadow-[4px_4px_0px_#1E293B] hover:bg-[#FBBF24] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1E293B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#1E293B]",
        candyPink:
          "rounded-full border-2 border-[#1E293B] bg-[#F472B6] text-white font-bold shadow-[4px_4px_0px_#1E293B] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1E293B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#1E293B]",
        candyYellow:
          "rounded-full border-2 border-[#1E293B] bg-[#FBBF24] text-[#1E293B] font-bold shadow-[4px_4px_0px_#1E293B] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1E293B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#1E293B]",
        candyMint:
          "rounded-full border-2 border-[#1E293B] bg-[#34D399] text-[#1E293B] font-bold shadow-[4px_4px_0px_#1E293B] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1E293B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#1E293B]",
        outline:
          "rounded-2xl border-2 border-[#1E293B] bg-white text-[#1E293B] font-semibold shadow-[3px_3px_0px_#1E293B] hover:bg-[#F1F5F9] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1E293B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#1E293B]",
        secondary:
          "rounded-2xl border-2 border-[#1E293B] bg-[#F472B6] text-white font-semibold shadow-[3px_3px_0px_#1E293B] hover:opacity-95",
        ghost:
          "rounded-xl hover:bg-[#F1F5F9] hover:text-[#1E293B] active:translate-y-0.5",
        destructive:
          "rounded-2xl border-2 border-[#1E293B] bg-[#EF4444] text-white font-bold shadow-[3px_3px_0px_#1E293B] hover:opacity-95",
        link: "text-[#8B5CF6] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 gap-2 px-4 text-sm",
        xs: "h-6.5 gap-1 px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-3 text-xs",
        lg: "h-11 gap-2 px-5 text-sm font-bold",
        xl: "h-13 gap-2.5 px-6 text-base font-bold",
        icon: "size-9 rounded-full",
        "icon-xs": "size-6.5 rounded-full [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 rounded-full",
        "icon-lg": "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
