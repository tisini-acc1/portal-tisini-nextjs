"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";

import { SideNavItem } from "./types";
import { COMPS_ITEMS, TEAMS_ITEMS } from "./constants";
import { useSession } from "next-auth/react";

const SideNav = () => {
  const { data: session } = useSession();
  const [sideNavItems, setSideNavItems] = useState<SideNavItem[]>([]);

  useEffect(() => {
    if (session && session.user) {
      const {
        user: { userRole },
      } = session;

      if (userRole === "is_competition_staff") setSideNavItems(COMPS_ITEMS);
      else if (userRole === "is_team_staff") setSideNavItems(TEAMS_ITEMS);
    }
  }, [session]);

  return (
    <div className="md:w-60 bg-gray-900 h-screen flex-1 fixed border-r border-b-gray-700 hidden md:flex">
      <div className="flex flex-col space-y-6 w-full">
        <Link
          href="/"
          className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-border h-20 w-full"
        >
          <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
          <span className="font-bold text-xl text-white hidden md:flex">
            Tisini
          </span>
        </Link>

        <div className="flex flex-col space-y-2 md:px-6">
          {sideNavItems.map((item, idx) => (
            <MenuItem key={idx} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between text-gray-400 hover:bg-gray-950 hover:text-gray-100 ${
              pathname.includes(item.path) ? "bg-gray-950 text-white" : ""
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-sm flex">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? "rotate-90" : ""} flex`}>
              <Icon icon="lucide:chevron-right" width="18" height="18" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4 text-gray-400 text-sm">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`hover:text-gray-100 ${
                      subItem.path === pathname ? "font-bold text-white" : ""
                    }`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg text-gray-400 hover:bg-gray-950 hover:text-gray-100 ${
            item.path === pathname ? "bg-gray-950 text-white" : ""
          }`}
        >
          {item.icon}
          <span className="font-semibold text-sm flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
