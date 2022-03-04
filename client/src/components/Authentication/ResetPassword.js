import React from "react";
import { Controller, useForm } from "react-hook-form";
import { LockClosedIcon } from "@heroicons/react/solid";

const ResetPassword = () => {
  const {
    handleSubmit,
    clearErrors,
    register,
    setValue,
    getValues,
    control,
    reset,
  } = useForm();

  const handleFormSubmit = async (event) => {
    console.log(event);
  };
  return (
    <div className="h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-dark">
            Thay Mật Khẩu
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
                type="password"
                {...register("password")}
                required
                autocomplete="off"
                className="relative block w-full px-3 py-2 mb-2 border-l-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
                placeholder="Mật Khẩu"
              />
            </div>
            <div>
              <input
                type="password"
                {...register("retypePassword")}
                required
                className="relative block w-full px-3 py-2 border-l-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
                placeholder="Xác nhận mật khẩu"
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
