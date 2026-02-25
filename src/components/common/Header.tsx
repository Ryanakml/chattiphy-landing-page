'use client';
import { useState } from 'react';
import Button from '../ui/Button';
import HeaderMenu from './HeaderMenu';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={twMerge('w-full bg-background-white', className)}>
      <div className="w-full max-w-[1202px] mx-auto px-4 sm:px-6 lg:px-8 mt-[7px] md:mt-[10px] lg:mt-[14px]">
        <div className="flex justify-between items-center h-auto py-4 lg:py-0">
          {/* Logo Section */}
          <div className="flex justify-center items-center w-auto">
            <div className="flex justify-center items-end w-full">
              <div className="flex justify-start items-center self-center flex-1">
                <div className="flex flex-col justify-start items-start w-full">
                  {/* Main logo vector */}

                  {/* Logo components row */}
                </div>
              </div>

              {/* Additional logo elements */}
              <Image
                src="/images/img_vector_black_900_20x16.svg"
                className="w-[16px] h-[20px] ml-[4px]"
                alt="logo additional"
                width={16}
                height={20}
              />

              {/* Stack element with notification */}
              <div className="relative w-[16px] h-[16px] ml-[18px]">
                <div className="absolute top-[6px] right-0 w-[54%] h-auto flex justify-end items-center">
                  <Image
                    src="/images/img_vector_indigo_a100.svg"
                    className="w-[3px] h-[3px]"
                    alt="notification dot"
                    width={3}
                    height={3}
                  />
                </div>
                <Image
                  src="/images/img_vector_black_900_16x16.svg"
                  className="absolute top-0 left-0 w-[16px] h-[16px]"
                  alt="notification icon"
                  width={16}
                  height={16}
                />
              </div>

              <Image
                src="/images/img_vector_black_900_20x8.svg"
                className="w-[10px] h-[20px] ml-[19px]"
                alt="final logo element"
                width={10}
                height={20}
              />
            </div>
          </div>

          {/* Hamburger Menu Icon (Mobile only) */}
          <button
            className="block lg:hidden p-2"
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className="block h-0.5 bg-text-tertiary"></span>
              <span className="block h-0.5 bg-text-tertiary"></span>
              <span className="block h-0.5 bg-text-tertiary"></span>
            </div>
          </button>

          {/* Navigation Menu - Hidden on mobile, visible on desktop */}
          <div
            className={`${menuOpen ? 'block' : 'hidden'} lg:flex absolute lg:relative top-full lg:top-auto left-0 lg:left-auto w-full lg:w-auto bg-background-white lg:bg-transparent shadow-lg lg:shadow-none z-50 lg:z-auto`}
          >
            <div className="flex flex-col lg:flex-row justify-between items-center w-full lg:w-auto p-4 lg:p-0 space-y-4 lg:space-y-0">
              <HeaderMenu />

              {/* Action Buttons */}
              <div className="flex flex-col lg:flex-row gap-3 lg:gap-[14px] justify-center items-center w-full lg:w-auto">
                <Button
                  text="Sign In"
                  variant="outline"
                  className="w-full lg:w-auto text-md font-medium leading-xl text-text-tertiary capitalize border border-border-dark rounded-base px-[12px] py-[8px]"
                />

                <div className="w-full lg:w-auto flex justify-center items-center bg-background-dark-secondary border border-border-white rounded-base px-[6px] py-[6px]">
                  <span className="text-md font-medium leading-xl text-left capitalize text-text-white">
                    Book a Demo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
