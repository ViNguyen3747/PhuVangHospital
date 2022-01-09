import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav class="relative flex flex-wrap items-center justify-between px-2 py-3 bg-blue mb-3">
        <div class="container px-4 mx-auto  flex flex-wrap items-center justify-between">
          <div class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            {/* Hamburger Menu */}
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>

          <div
            className={
              "lg:flex flex-grow items-center" +
              (menuOpen ? " flex" : " hidden")
            }
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <NavLink
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:text-turquoise-light"
                  activeClassName="text-turquoise-light"
                  to="/bangchamcong"
                  exact
                >
                  Bảng Chấm Công
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white  hover:text-turquoise-light"
                  activeClassName="text-turquoise-light"
                  to="/nhanvien"
                  exact
                >
                  Nhân Viên
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:text-turquoise-light"
                  activeClassName="text-turquoise-light"
                  to="/khoa"
                  exact
                >
                  Khoa
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:text-turquoise-light"
                  activeClassName="text-turquoise-light"
                  to="/taikhoan"
                  exact
                >
                  Tài Khoản
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
