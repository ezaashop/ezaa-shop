import { cn } from "@/lib/utils"; // assuming you're using the shadcn setup

export const H1 = ({
  children,
  className,
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1
    className={cn("text-4xl md:text-5xl font-bold tracking-tight", className)}
  >
    {children}
  </h1>
);

export const H2 = ({
  children,
  className,
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-3xl md:text-4xl font-semibold", className)}>
    {children}
  </h2>
);

export const H3 = ({
  children,
  className,
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-2xl md:text-3xl font-semibold", className)}>
    {children}
  </h3>
);

export const H4 = ({
  children,
  className,
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h4 className={cn("text-xl md:text-2xl font-semibold", className)}>
    {children}
  </h4>
);

export const Paragraph = ({
  children,
  className,
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-base text-muted-foreground", className)}>{children}</p>
);

export const Small = ({
  children,
  className,
}: React.HTMLAttributes<HTMLElement>) => (
  <small className={cn("text-xs text-muted-foreground", className)}>
    {children}
  </small>
);

export const Label = ({
  children,
  className,
}: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className={cn("text-sm font-medium text-foreground", className)}>
    {children}
  </label>
);

export const Muted = ({
  children,
  className,
}: React.HTMLAttributes<HTMLElement>) => (
  <span className={cn("text-sm text-muted", className)}>{children}</span>
);

export const ButtonText = ({
  children,
  className,
}: React.HTMLAttributes<HTMLElement>) => (
  <div
    className={cn("text-sm font-semibold uppercase tracking-wide", className)}
  >
    {children}
  </div>
);
