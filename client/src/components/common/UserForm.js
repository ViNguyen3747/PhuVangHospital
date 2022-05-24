import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { animateScroll as scroll } from "react-scroll";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  admin: false,
  password: "",
  reTypedPassword: "",
};
export const UserForm = ({ currentUser, setUser }) => {
  const {
    handleSubmit,
    setValue,
    register,
    clearErrors,
    // getValues,
    // control,
    reset,
  } = useForm({ initialValues: initialState });

  useEffect(() => {
    reset();
    if (currentUser) {
      Object.entries(currentUser).map(([key, value]) => setValue(key, value));
    }
  }, [currentUser, reset, setValue]);
  const handleFormSubmit = (userData) => {
    console.log(userData);
  };
  const clear = () => {
    setUser(null);
    clearErrors();
    reset();
    scroll.scrollToTop();
  };
  return (
    <div className="md:container md:mx-auto mt-10 border-t-2 border-gray">
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Họ
                      </label>
                      <input
                        type="text"
                        {...register("lastName")}
                        className="mt-1 relative block w-full px-3 py-2 mb-2 border-b-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tên
                      </label>
                      <input
                        type="text"
                        {...register("firstName")}
                        className="mt-1 relative block w-full px-3 py-2 mb-2 border-b-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        className="mt-1 relative block w-full px-3 py-2 mb-2 border-b-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <input type="checkbox" {...register("admin")} />
                      <label
                        htmlFor="admin"
                        className=" text-sm font-medium text-gray-800 px-4"
                      >
                        Admin
                      </label>
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Mật Khẩu {currentUser && `Mới`}
                      </label>
                      <input
                        type="password"
                        {...register("password")}
                        className="mt-1 relative block w-full px-3 py-2 mb-2 border-b-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="reTypedPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Xác Nhận Mật Khẩu
                      </label>
                      <input
                        type="password"
                        {...register("reTypedPassword")}
                        className="mt-1 relative block w-full px-3 py-2 mb-2 border-b-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button className="group relative w-full flex justify-center  py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-gradient-to-r from-turquoise to-blue duration-500 ease-out">
                    Nhập
                  </button>
                </div>
              </div>
            </form>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                className="group relative w-full flex justify-center  py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-gradient-to-r from-yellow to-brown-light duration-500 ease-out"
                onClick={clear}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
