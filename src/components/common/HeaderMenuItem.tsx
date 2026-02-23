'use client';
import { twMerge } from 'tailwind-merge';

interface HeaderMenuItemProps {
  text: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const HeaderMenuItem = ({ text, isActive = false, onClick, className }: HeaderMenuItemProps) => {
  return (
    <button
      role="menuitem"
      onClick={onClick}
      className={twMerge(
        'text-md font-normal leading-xl text-left text-text-tertiary transition-all duration-200 hover:text-background-accent-primary focus:outline-none focus:text-background-accent-primary',
        isActive && 'font-bold',
        className
      )}
    >
      {text}
    </button>
  );
};

export default HeaderMenuItem;
