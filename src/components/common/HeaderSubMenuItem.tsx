'use client';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

interface HeaderSubMenuItemProps {
  text: string;
  submenuItems?: string[];
  onClick?: () => void;
  className?: string;
}

const HeaderSubMenuItem = ({
  text,
  submenuItems = [],
  onClick,
  className,
}: HeaderSubMenuItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (onClick) onClick();
  };

  return (
    <div className="relative">
      <button
        role="menuitem"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={handleToggle}
        className={twMerge(
          'flex gap-[2px] justify-center items-center w-auto text-md font-normal leading-xl text-left text-text-tertiary transition-all duration-200 hover:text-background-accent-primary focus:outline-none focus:text-background-accent-primary',
          className
        )}
      >
        <span>{text}</span>
        <Image
          src="/images/img_arrow_down.svg"
          className={`w-[20px] h-[20px] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          alt="dropdown arrow"
          width={20}
          height={20}
        />
      </button>

      {/* Submenu */}
      {isOpen && submenuItems.length > 0 && (
        <ul
          role="menu"
          className="absolute top-full left-0 mt-2 bg-background-white border border-border-light rounded-base shadow-lg min-w-[160px] z-50"
        >
          {submenuItems.map((item, index) => (
            <li key={index}>
              <button
                role="menuitem"
                className="w-full px-4 py-2 text-left text-md font-normal text-text-tertiary hover:bg-background-gray-light hover:text-background-accent-primary transition-colors duration-200"
                onClick={() => {
                  setIsOpen(false);
                  // Handle submenu item click
                }}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HeaderSubMenuItem;
