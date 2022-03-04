import React from "react";
import { NavLink } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { LockClosedIcon } from "@heroicons/react/solid";

const initialState = {
  email: "",
  password: "",
};

const Signin = () => {
  const {
    handleSubmit,
    clearErrors,
    register,
    setValue,
    getValues,
    control,
    reset,
  } = useForm({
    defaultValues: initialState,
  });

  const handleFormSubmit = async (event) => {
    console.log(event);
  };
  return (
    <>
      <div className="h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-dark">
              Đăng Nhập Vào Tài Khoản
            </h2>
          </div>

          <form
            className="w-96 mt-8 space-y-4 2-full"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="block text-sm font-medium text-black">
              <div>
                <input
                  type="email"
                  {...register("email")}
                  required
                  autocomplete="off"
                  className="relative block w-full px-3 py-2 mb-2 border-l-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
                  placeholder="Email"
                />
              </div>
              <div>
                <input
                  type="password"
                  {...register("password")}
                  required
                  className="relative block w-full px-3 py-2 border-l-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <p className="mt-6 text-left text-base font-medium">
                <NavLink
                  to="/user/forgotpassword"
                  className="hover:text-turquoise ease-in-out"
                >
                  Quên Mật Khẩu?
                </NavLink>
              </p>
            </div>
            <div>
              <button className="group relative w-full flex justify-center  py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-gradient-to-r from-turquoise to-blue hover:from-blue hover:to-turquoise duration-500 ease-out">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                Nhập
              </button>
              <p className="mt-6 text-center text-base font-medium">
                Không có tài khoản?{" "}
                <NavLink
                  to="/dangky"
                  className="hover:text-turquoise ease-in-out"
                >
                  Đăng Ký
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
