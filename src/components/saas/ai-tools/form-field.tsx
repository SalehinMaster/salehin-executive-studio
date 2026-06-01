"use client";

import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type FormFieldProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

export function FormField({ label, children, className }: FormFieldProps) {
  return (
    <label className={cn("block space-y-2", className)}>
      <span className="text-eyebrow text-muted">{label}</span>
      {children}
    </label>
  );
}

const inputClassName =
  "focus-ring w-full resize-none rounded-lg border border-border-strong bg-surface/60 px-4 py-3 text-sm text-foreground placeholder:text-muted/70";

export function FormTextarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(inputClassName, props.className)} />;
}

export function FormInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputClassName, "resize-none", props.className)} />;
}
