import * as React from "react"
import { cn } from "@/lib/utils"

function Card({
  className,
  size = "default",
  variant = "sticker",
  ...props
}: React.ComponentProps<"div"> & {
  size?: "default" | "sm" | "lg"
  variant?: "sticker" | "flat" | "elevated"
}) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col rounded-2xl bg-card text-card-foreground transition-all duration-300",
        variant === "sticker" &&
          "border-2 border-border shadow-[5px_5px_0px_#1E293B] hover:-translate-y-1 hover:shadow-[7px_7px_0px_#1E293B]",
        variant === "flat" && "border-2 border-border",
        variant === "elevated" &&
          "border-2 border-border shadow-[8px_8px_0px_#1E293B]",
        size === "sm" ? "p-3.5" : size === "lg" ? "p-6" : "p-5",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-heading text-base font-bold text-foreground", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-xs text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("self-start justify-self-end", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("flex-1 pt-2", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center pt-3 border-t-2 border-muted", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
