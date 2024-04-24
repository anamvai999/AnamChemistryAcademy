"use client";
import React from "react";
import { BiBarChart, BiDetail, BiFolder, BiVideo } from "react-icons/bi";
import "./SideBarMenu.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBarMenu = () => {

  const pathName = usePathname();

  const links = [
    {
      link: "/dashboard",
      linkText: "Dashboard",
      linkIcon: <BiBarChart />,
     
    },
    {
      link: "/dashboard/manage-category",
      linkText: "Manage Category",
      linkIcon: <BiFolder />,
     
    },
    {
      link: "/dashboard/upload-videos",
      linkText: "Upload Videos",
      linkIcon: <BiVideo />,
     
    },
    {
      link: "/dashboard/manage-videos",
      linkText: "Manage Videos",
      linkIcon: <BiDetail />,
     
    },
  ];

  return (
    <div className="text-blue-500">
      <h1 className="text-xl text-center my-6">Ak Academy</h1>
      <ul className="mt-4">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              className={`${
                link.link === pathName && "bg-blue-400 rounded-lg text-white"
              } px-4 py-2`}
              href={`${link.link}`}
            >
              {link.linkIcon} {link.linkText}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBarMenu;
