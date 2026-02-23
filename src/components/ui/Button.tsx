'use client';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { ButtonHTMLAttributes, ReactNode, CSSProperties } from 'react';

const buttonClasses = cva(
  'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-background-dark-secondary text-text-white hover:bg-background-dark-primary focus:ring-background-accent-primary',
        secondary:
          'bg-background-accent-primary text-text-white hover:bg-background-accent-primary/80 focus:ring-background-accent-primary',
        outline:
          'border-2 border-border-dark text-text-tertiary bg-transparent hover:bg-background-gray-light focus:ring-border-dark',
      },
      size: {
        small: 'text-sm px-3 py-1.5',
        medium: 'text-base px-4 py-2',
        large: 'text-lg px-6 py-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonClasses> {
  // Required parameters with defaults
  text?: string;
  text_font_size?: string;
  text_font_family?: string;
  text_font_weight?: string;
  text_line_height?: string;
  text_text_align?: string;
  text_text_transform?: string;
  text_color?: string;
  border_border?: string;
  border_border_radius?: string;
  fill_background_color?: string;

  // Optional parameters
  layout_width?: string;
  padding?: string;
  position?: string;
  margin?: string;

  // Standard React props
  children?: ReactNode;
}

const Button = ({
  // Required parameters with defaults
  text = 'Start the Process Now',
  text_font_size = 'text-lg',
  text_font_family = 'DM Sans',
  text_font_weight = 'font-medium',
  text_line_height = 'leading-3xl',
  text_text_align = 'left',
  text_text_transform = 'capitalize',
  text_color = 'text-text-white',
  border_border = '1 solid border-border-white',
  border_border_radius = 'rounded-base',
  fill_background_color = 'bg-background-dark-secondary',

  // Optional parameters (no defaults)
  layout_width,
  padding,
  position,
  margin,

  // Standard React props
  variant,
  size,
  disabled = false,
  className,
  children,
  onClick,
  type = 'button',
  ...props
}: ButtonProps) => {
  // Safe validation for optional parameters
  const hasValidWidth =
    layout_width && typeof layout_width === 'string' && layout_width.trim() !== '';
  const hasValidPadding = padding && typeof padding === 'string' && padding.trim() !== '';
  const hasValidMargin = margin && typeof margin === 'string' && margin.trim() !== '';
  const hasValidPosition = position && typeof position === 'string' && position.trim() !== '';

  const optionalClasses = [
    hasValidWidth ? `w-[${layout_width}]` : '',
    hasValidPadding ? `p-[${padding}]` : '',
    hasValidMargin ? `m-[${margin}]` : '',
    hasValidPosition ? position : '',
  ]
    .filter(Boolean)
    .join(' ');

  // Build custom styles for non-Tailwind properties
  const customStyles: CSSProperties = {
    // Only use inline styles for truly custom values
    ...(text_font_family &&
      !text_font_family.startsWith('font-') && { fontFamily: text_font_family }),
  };

  // Build Tailwind classes for styling
  const styleClasses = [
    text_font_size,
    text_font_family.startsWith('font-') ? text_font_family : '',
    text_font_weight,
    text_line_height,
    text_text_align === 'center'
      ? 'text-center'
      : text_text_align === 'right'
        ? 'text-right'
        : 'text-left',
    text_text_transform,
    text_color,
    // Only apply these if not using variant system
    !variant ? fill_background_color : '',
    !variant ? 'border' : '',
    border_border_radius,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (typeof onClick === 'function') {
      onClick(event);
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      style={customStyles}
      className={twMerge(
        buttonClasses({ variant, size }),
        styleClasses,
        optionalClasses,
        className
      )}
      aria-disabled={disabled}
      {...props}
    >
      {children || text}
    </button>
  );
};

export default Button;
