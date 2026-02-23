'use client';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { InputHTMLAttributes, forwardRef, CSSProperties } from 'react';

const editTextClasses = cva(
  'w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default:
          'border border-border-light focus:ring-background-accent-primary focus:border-transparent',
        filled: 'bg-background-cream border-0 focus:ring-background-accent-primary',
        outline:
          'border-2 border-border-gray focus:ring-background-accent-primary focus:border-background-accent-primary bg-transparent',
      },
      size: {
        small: 'text-sm px-2 py-1.5',
        medium: 'text-base px-3 py-2',
        large: 'text-lg px-4 py-3',
      },
    },
    defaultVariants: {
      variant: 'filled',
      size: 'medium',
    },
  }
);

interface EditTextProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof editTextClasses> {
  // Required parameters with defaults
  placeholder?: string;
  text_font_size?: string;
  text_font_family?: string;
  text_font_weight?: string;
  text_line_height?: string;
  text_text_align?: string;
  text_color?: string;
  fill_background_color?: string;
  border_border_radius?: string;

  // Optional parameters
  layout_width?: string;
  padding?: string;
  position?: string;
}

const EditText = forwardRef<HTMLInputElement, EditTextProps>(
  (
    {
      // Required parameters with defaults
      placeholder = 'Enter your email',
      text_font_size = 'text-base',
      text_font_family = 'Inter',
      text_font_weight = 'font-normal',
      text_line_height = 'leading-md',
      text_text_align = 'left',
      text_color = 'text-text-primary',
      fill_background_color = 'bg-background-cream',
      border_border_radius = 'rounded-base',

      // Optional parameters (no defaults)
      layout_width,
      padding,
      position,

      // Standard React props
      variant,
      size,
      disabled = false,
      className,
      type = 'text',
      ...props
    },
    ref
  ) => {
    // Safe validation for optional parameters
    const hasValidWidth =
      layout_width && typeof layout_width === 'string' && layout_width.trim() !== '';
    const hasValidPadding = padding && typeof padding === 'string' && padding.trim() !== '';
    const hasValidPosition = position && typeof position === 'string' && position.trim() !== '';

    const optionalClasses = [
      hasValidWidth ? `w-[${layout_width}]` : '',
      hasValidPadding ? `p-[${padding}]` : '',
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
      text_color,
      // Only apply these if not using variant system
      !variant ? fill_background_color : '',
      border_border_radius,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        style={customStyles}
        className={twMerge(
          editTextClasses({ variant, size }),
          styleClasses,
          optionalClasses,
          className
        )}
        aria-disabled={disabled}
        {...props}
      />
    );
  }
);

EditText.displayName = 'EditText';

export default EditText;
