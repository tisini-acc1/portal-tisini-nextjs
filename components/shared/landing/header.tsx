"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import NavMobile from "./nav-mobile";
import { navigation } from "./constants";
import SigninButton from "./signin-button";
import Image from "next/image";

const Header = () => {
  // const [bg, setBg] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <header
      className={`${"bg-black/10"} fixed left-0 w-full z-20 transition-all duration-200`}
    >
      <div className="max-w-[1200px] mx-auto p-3">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image src={"/Tisini.png"} alt="Tisini" width={100} height={100} />
          </Link>

          <div
            onClick={() => setMobileNav(!mobileNav)}
            className="text-2xl text-white md:hidden lg:text-xl cursor-pointer"
          >
            {mobileNav ? <X /> : <Menu />}
          </div>

          <nav className="hidden md:flex md:items-center md:justify-center">
            <ul className="md:flex gap-x-12">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    className="capitalize text-white hover:border-b hover:border-[#A020F0] hover:text-[#A020F0] transition-all"
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <SigninButton />
          </nav>

          <div
            className={`${
              mobileNav ? "left-0" : "-left-full"
            } md:hidden fixed bottom-0 w-full max-w-xs h-screen transition-all`}
          >
            <NavMobile />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
