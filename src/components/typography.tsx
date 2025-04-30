import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

// Typography base styles and variants
const typographyVariants = cva("", {
  variants: {
    variant: {
      // Headings
      heading: "font-antonio text-2xl font-bold leading-tight md:text-4xl bg-gradient-to-br from-signature via-signature to-primary text-transparent bg-clip-text",
      subheading: "font-antonio text-xl font-semibold leading-snug md:text-3xl",
      h1: "font-antonio text-4xl font-bold leading-tight md:text-5xl lg:text-6xl",
      h2: "font-antonio text-3xl font-bold leading-tight md:text-4xl",
      h3: "font-antonio text-2xl font-bold leading-tight md:text-3xl",
      h4: "font-antonio text-xl font-semibold leading-snug md:text-2xl",
      h5: "font-antonio text-lg font-semibold leading-snug md:text-xl",
      h6: "font-antonio text-base font-semibold leading-snug md:text-lg",

      // Special headings
      xxh: "font-antonio text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl leading-none",
      xh: "font-antonio text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl leading-none",

      // Body text
      p: "font-poppins text-base leading-normal",
      small: "font-poppins text-sm leading-normal",
      xs: "font-poppins text-xs leading-normal",

      // Special text
      label: "font-poppins text-sm font-medium leading-none",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
}

/**
 * Typography component for consistent text styling throughout the application.
 *
 * @example
 * ```tsx
 * <Typography variant="h1">Heading 1</Typography>
 * <Typography variant="p">Regular paragraph text</Typography>
 * <Typography variant="small" className="text-muted-foreground">Small muted text</Typography>
 * ```
 */
const Typography = ({ className, variant, as, ...props }: TypographyProps) => {
  const Component = as || getDefaultElement(variant);

  return (
    <Component
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    />
  );
};

// Helper function to get default HTML element based on variant
const getDefaultElement = (variant: TypographyProps["variant"]) => {
  switch (variant) {
    case "h1":
      return "h1";
    case "h2":
      return "h2";
    case "h3":
      return "h3";
    case "h4":
      return "h4";
    case "h5":
      return "h5";
    case "h6":
      return "h6";
    case "xxh":
    case "xh":
      return "h1";
    case "small":
    case "xs":
      return "small";
    case "label":
      return "label";
    default:
      return "p";
  }
};

export const Heading = (props: Omit<TypographyProps, "variant">) => (
  <Typography variant="heading" {...props} />
);

export const Subheading = (props: Omit<TypographyProps, "variant">) => (
  <Typography variant="subheading" {...props} />
);

// Export named components for each variant
export const H1 = (props: Omit<TypographyProps, "variant">) => (
  <Typography variant="h1" {...props} />
);

export const H2 = (props: Omit<TypographyProps, "variant">) => (
  <Typography variant="h2" {...props} />
);

export const H3 = (props: Omit<TypographyProps, "variant">) => (
  <Typography variant="h3" {...props} />
);

export const H4 = (props: Omit<TypographyProps, "variant">) => (
  <Typography variant="h4" {...props} />
);

export const H5 = (props: Omit<TypographyProps, "variant">) => (
  <Typography variant="h5" {...props} />
);

export const H6 = (props: Omit<TypographyProps, "variant">) => (
  <Typography variant="h6" {...props} />
);

export const XXHeading = (props: Omit<TypographyProps, "variant">) => (
  <Typography variant="xxh" {...props} />
);

export const XHeading = (props: Omit<TypographyProps, "variant">) => (
  <Typography variant="xh" {...props} />
);

export const Paragraph = (props: Omit<TypographyProps, "variant">) => (
  <Typography variant="p" {...props} />
);

export const Small = (props: Omit<TypographyProps, "variant">) => (
  <Typography variant="small" {...props} />
);

export const XSmall = (props: Omit<TypographyProps, "variant">) => (
  <Typography variant="xs" {...props} />
);

// For the Label component, use a specific implementation
export interface LabelProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "className"> {
  className?: string;
  children?: React.ReactNode;
}

export const Label = ({ className, ...props }: LabelProps) => (
  <label
    className={cn(typographyVariants({ variant: "label" }), className)}
    {...props}
  />
);

export { Typography, typographyVariants };
