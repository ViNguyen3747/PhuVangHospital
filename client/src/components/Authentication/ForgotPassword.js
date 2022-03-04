import React from "react";

const ForgotPassword = () => {
  return (
    <div className="h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-dark">
            Quên Mật Khẩu
          </h2>
        </div>
        <div className="w-96 mt-8 space-y-4 2-full">
          <div>
            <input
              type="email"
              required
              autocomplete="off"
              className="relative block w-full px-3 py-2 mb-6 mt-4 border-b-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
              placeholder="Email"
            />
          </div>
          <div>
            <button className="group relative w-full flex justify-center  py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-gradient-to-r from-turquoise to-blue hover:from-blue hover:to-turquoise duration-500 ease-out">
              Nhập
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
