"use client";

import { useAppContext } from "@/context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { deleteCookie } from "cookies-next";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const Navbar = () => {
  const { state } = useAppContext();
  const router = useRouter();
  const logout = () => {
    deleteCookie("auth");
    deleteCookie("name");
    deleteCookie("image");
    router.push("/login");
  };
  const pathname = usePathname();

  const items = [
    {
      label: "Dashboard",
      link: "/dashboard",
    },
    {
      label: "Products",
      link: "/products",
    },
  ];

  return (
    <nav className="px-16 py-5 bg-[#1C2536] flex justify-between">
      <div className="flex gap-16 items-center ">
        <div className="lg:flex gap-3 items-center hidden">
          <Image
            src="https://mobizinc.com/wp-content/uploads/2022/06/logo-xl.png"
            width={38}
            height={38}
            alt="mobiz-logo"
          />
          <h1 className="text-3xl text-white">Test Task</h1>
        </div>
        <ul className="flex gap-3 flex-col md:flex-row">
          {items.map((item) => (
            <li className="flex" key={item.link}>
              <Link
                className={`${
                  item.link === pathname ? "text-white bg-[#ffffff1a]" : ""
                } py-4 px-8 hover:bg-[#ffffff1a] rounded-xl text-[#a2a6aa] hover:text-white align-middle`}
                href={item.link}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {state?.user?.name?.length ? (
        <div className="flex gap-4 items-center">
          <span className="text-slate-100 hidden lg:flex">
            Welcome, {state?.user?.name}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer" asChild>
              <Image
                src={state?.user?.image || ""}
                alt="user"
                width={48}
                height={48}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-24 -ml-20">
              <DropdownMenuItem className="justify-around" onClick={logout}>
                <LogOut className="w-5" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : null}
    </nav>
  );
};
