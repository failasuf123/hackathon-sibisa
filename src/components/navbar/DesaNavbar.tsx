"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaClipboardList,
  FaUsers,
  FaComments,
  FaLeaf,
  FaSignOutAlt,
} from "react-icons/fa";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function DesaNavbar({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();

  const user = Cookies.get("user")
    ? JSON.parse(Cookies.get("user")!)
    : { username: "Guest", userPicture: null };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menu = [
    { name: "Dashboard", path: "/desa/dashboard", icon: <FaHome /> },
    { name: "Pendataan", path: "/desa/pendataan", icon: <FaClipboardList /> },
    { name: "KPM", path: "/desa/kpm", icon: <FaUsers /> },
    { name: "Musyawarah", path: "/desa/musyawarah", icon: <FaComments /> },
  ];

  const logout = () => {
    Cookies.remove("user");
    Cookies.remove("userRole");
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Sidebar for md+ */}
      <motion.aside
        animate={{ width: isOpen ? 220 : 64 }}
        className="hidden md:flex flex-col bg-white shadow-md border-r relative"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 p-4 text-blue-600 font-bold">
          <FaLeaf size={28} />
          {isOpen && <span className="text-lg">SIBISA Desa</span>}
        </div>

        {/* Menu */}
        <nav className="flex-1">
          {menu.map((m) => (
            <Link
              key={m.path}
              href={m.path}
              className={`flex items-center gap-3 px-4 py-3 hover:bg-blue-50 ${
                pathname === m.path ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-700"
              }`}
            >
              <span className="text-lg">{m.icon}</span>
              {isOpen && <span>{m.name}</span>}
            </Link>
          ))}
        </nav>

        {/* Profile bottom */}
        <div className="p-4 border-t flex items-center gap-2 hover:bg-gray-100 cursor-pointer relative group">
          {user.userPicture ? (
            <Image
              src={user.userPicture}
              alt="profile"
              width={36}
              height={36}
              className="rounded-full"
            />
          ) : (
            <FaUsers size={32} />
          )}
          {isOpen && <span>{user.username}</span>}

          {/* Tooltip Logout */}
          <div className="absolute bottom-14 left-4 bg-white shadow-md rounded-lg px-3 py-2 hidden group-hover:block">
            <button
              onClick={logout}
              className="flex items-center gap-2 text-red-500 hover:text-red-600"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-6 bg-white border rounded-full p-1 shadow"
        >
          {isOpen ? "<" : ">"}
        </button>
      </motion.aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Header for sm only */}
        <motion.header
          initial={{ y: 0 }}
          animate={{ y: scrollY > 20 ? -80 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-md shadow px-4 py-3 flex justify-between items-center z-40"
        >
          <div className="flex items-center gap-2 text-blue-600 font-bold">
            <FaLeaf size={24} />
            <span>SIBISA Desa</span>
          </div>
          <div className="relative group">
            {user.userPicture ? (
              <Image
                src={user.userPicture}
                alt="profile"
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <FaUsers size={28} />
            )}
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg px-3 py-2 hidden group-hover:block">
              <p className="mb-2">{user.username}</p>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-red-500 hover:text-red-600"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        </motion.header>

        {/* Page Content */}
        <div className="pt-16 md:pt-0 p-6 flex-1">{children}</div>

        {/* Bottom nav for sm */}
        <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-white/60 backdrop-blur-md rounded-2xl shadow-lg flex justify-around py-3">
          {menu.map((m) => (
            <Link
              key={m.path}
              href={m.path}
              className={`flex flex-col items-center ${
                pathname === m.path ? "text-blue-600" : "text-gray-700"
              } hover:text-blue-600`}
            >
              <span className="text-xl">{m.icon}</span>
              <span className="text-xs">{m.name}</span>
            </Link>
          ))}
        </nav>
      </main>
    </div>
  );
}
