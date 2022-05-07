import React from "react";
import { NavLink } from "react-router-dom";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  CalendarIcon,
  MenuIcon,
  XIcon,
  UserIcon,
  UserGroupIcon,
  IdentificationIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import auth from "../../utils/auth";
const links = [
  {
    name: "Bảng Chấm Công",
    href: "/",
    icon: CalendarIcon,
  },
  {
    name: "Nhân Viên",
    href: "/nhanvien",
    icon: UserIcon,
  },
];
const more = [
  {
    name: "Tài Khoản",
    href: "/taikhoan",
    icon: UserGroupIcon,
  },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-turquoise-dark hover:text-turquoise focus:outline-none">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            {auth.loggedIn() && (
              <div className="-m-3 p-3 flex items-start text-base font-medium text-turquoise-dark hover:text-turquoise">
                Xin Chào {localStorage.getItem("name")}
              </div>
            )}
            {links.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className="-m-3 p-3 flex items-start text-base font-medium text-turquoise-dark hover:text-turquoise"
              >
                <item.icon className="flex-shrink-0 h-6 w-6" />
                {item.name}
              </NavLink>
            ))}
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? "text-turquoise" : "text-turquoise-dark",
                      "group bg-white rounded-md inline-flex items-center text-base font-medium focus:outline-none"
                    )}
                  >
                    <span>More</span>
                    <ChevronDownIcon
                      className="ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          {more.map((item) => (
                            <NavLink
                              key={item.name}
                              to={item.href}
                              className="-m-3 p-3 flex items-start rounded-lg  text-turquoise-dark hover:text-turquoise"
                            >
                              <item.icon
                                className="flex-shrink-0 h-6 w-6"
                                aria-hidden="true"
                              />
                              <div className="ml-4">
                                <p className="text-base font-medium">
                                  {item.name}
                                </p>
                              </div>
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <button
              onClick={() => auth.logout()}
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-turquoise-dark hover:bg-turquoise ease-out"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="z-10 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-turquoise-dark">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-end">
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {links.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50 text-turquoise-dark hover:text-turquoise"
                    >
                      <item.icon
                        className="flex-shrink-0 h-6 w-6 "
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-base font-medium ">
                        {item.name}
                      </span>
                    </NavLink>
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                {more.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className="flex text-base font-medium text-turquoise-dark hover:text-turquoise"
                  >
                    <item.icon
                      className="flex-shrink-0 h-6 w-6"
                      aria-hidden="true"
                    />
                    <span className="ml-3 text-base font-medium">
                      {item.name}
                    </span>
                  </NavLink>
                ))}
              </div>
              <div>
                <NavLink
                  to="/"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-turquoise to-blue hover:from-blue hover:to-turquoise duration-500 ease-out"
                >
                  Đăng xuất
                </NavLink>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Navbar;
