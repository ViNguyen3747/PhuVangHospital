import React from "react";
import { NavLink } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { LockClosedIcon } from "@heroicons/react/solid";

const initialState = {
  email: "",
  password: "",
  retypePassword: "",
};

const SignUp = () => {
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
      <div className="h-screen flex justify-center items-start py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-dark">
              Tạo Tài Khoản
            </h2>
          </div>
          <form
            className="w-96 mt-8 space-y-6 "
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <div className="block text-sm font-medium text-blac">
              <div>
                <input
                  type="text"
                  {...register("name")}
                  required
                  className="relative block w-full px-3 py-2 mb-2 border-l-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
                  placeholder="Họ và Tên"
                />
              </div>
              <div>
                <input
                  type="email"
                  {...register("email")}
                  required
                  className="relative block w-full px-3 py-2 mb-2 border-l-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
                  placeholder="Email"
                />
              </div>
              <div>
                <input
                  type="password"
                  {...register("password")}
                  required
                  className="relative block w-full px-3 py-2 mb-2 border-l-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
                  placeholder="Mật Khẩu"
                />
              </div>
              <div>
                <input
                  type="password"
                  {...register("retypePassword")}
                  required
                  className="relative block w-full px-3 py-2 mb-2 border-l-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
                  placeholder="Xác nhận Mật Khẩu"
                />
              </div>
            </div>

            <div>
              <button className="group relative w-full flex justify-center  py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-gradient-to-r from-turquoise to-blue hover:from-blue hover:to-turquoise duration-500 ease-out">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                Nhập
              </button>
              <p className="mt-6 text-center text-base font-medium">
                Đã có tài khoản?{" "}
                <NavLink
                  to="/dangnhap"
                  className="hover:text-turquoise ease-in-out"
                >
                  Đăng Nhập
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
