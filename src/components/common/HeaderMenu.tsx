'use client';

import HeaderMenuItem from './HeaderMenuItem';
import HeaderSubMenuItem from './HeaderSubMenuItem';

const HeaderMenu = () => {
  return (
    <nav className="flex flex-col lg:flex-row gap-4 lg:gap-[50px] justify-center items-center w-full lg:w-auto">
      <HeaderMenuItem text="Chat Agent" isActive={true} />

      <HeaderSubMenuItem
        text="Products"
        submenuItems={['AI Chatbot', 'Live Chat', 'Knowledge Base']}
      />

      <HeaderMenuItem text="Pricing" />

      <HeaderMenuItem text="Blog" />

      <HeaderMenuItem text="FAQ's" />
    </nav>
  );
};

export default HeaderMenu;
