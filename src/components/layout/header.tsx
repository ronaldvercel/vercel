"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Logo from "../Logo";
import Link from "next/link";
import { Disclosure, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import { useRouter } from "next/navigation";
// import { logout } from "@/app/actions";

const generalLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "/#about" },
  { label: "Jobs", href: "/#jobs" },
  { label: "FAQ", href: "/#faq" },
];

const clientLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Jobs", href: "/dashboard/jobs" },
];

const adminLinks = [
  { label: "Company", href: "/admin/company" },
  { label: "Create", href: "/admin/create" },
  { label: "Jobs", href: "/admin/jobs" },
  { label: "Token", href: "/admin/token" },
  { label: "Update Pay", href: "/admin/update-pay" },
];

const Header: React.FC = () => {
  const pathname = usePathname();
  let userType: "general" | "client" | "admin" = "general";
  if (pathname?.startsWith("/dashboard")) userType = "client";
  else if (pathname?.startsWith("/admin")) userType = "admin";
  else if (
    pathname === "/" ||
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/validate")
  )
    userType = "general";

  // Select links based on userType
  let navLinks;
  if (userType === "client") navLinks = clientLinks;
  else if (userType === "admin") navLinks = adminLinks;
  else navLinks = generalLinks;
  // const router = useRouter();

  return (
    <Disclosure
      as="header"
      className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200 transition-all"
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <Link href={"/"} className="flex items-center animate-fade-in">
                <Logo size="md" />
              </Link>

              {/* Desktop nav */}
              <nav className="hidden md:flex items-center space-x-10 animate-fade-in delay-150">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="relative text-gray-600 font-medium transition-colors duration-300 hover:text-primary-600 group"
                  >
                    {link.label}
                    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </nav>
              {/* {userType === "general" ? (
                <Button
                  onClick={() => {
                    router.push("/validate");
                  }}
                  className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 hidden md:block text-white px-5 py-2 rounded-lg font-semibold transition-transform duration-300 hover:scale-105 shadow hover:shadow-lg"
                >
                  Validate token
                </Button>
              ) : (
                <Button
                  onClick={async () => {
                    await logout();
                  }}
                  className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 hidden md:block text-white px-5 py-2 rounded-lg font-semibold transition-transform duration-300 hover:scale-105 shadow hover:shadow-lg"
                >
                  Logout
                </Button>
              )} */}

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Disclosure.Button
                  aria-label="Toggle menu"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-600"
                >
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* CTA Button */}

              <div className="hidden md:block animate-fade-in delay-300"></div>
            </div>
          </div>

          {/* Mobile nav panel */}
          <Disclosure.Panel className="md:hidden">
            <Transition
              show={open} // <--- Add this line
              enter="transition duration-150 ease-out"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition duration-100 ease-in"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <nav className="px-2 pt-2 pb-4 space-y-1">
                {navLinks.map((link) => (
                  <Disclosure.Button
                    as={Link}
                    key={link.label}
                    href={link.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-100 hover:text-primary-700"
                  >
                    {link.label}
                  </Disclosure.Button>
                ))}
                <div className="px-3 pt-2">
                  <Button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-semibold transition-transform duration-300 hover:scale-105 shadow hover:shadow-lg">
                    Validate token
                  </Button>
                </div>
              </nav>
            </Transition>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
