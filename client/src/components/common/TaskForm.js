import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { animateScroll as scroll } from "react-scroll";

const initialState = {
  name: "",
  date: new Date(),
  employees: "",
};
const TaskForm = ({ currentSelection, setCurrentSelection }) => {
  const {
    handleSubmit,
    clearErrors,
    setValue,
    register,
    getValues,
    // control,
    reset,
  } = useForm({ defaultValues: initialState });

  // const handleFormSubmit = async(taskData) => {
  //   if(currentSelection) {
  //     const data = await
  //   }
  // }
  useEffect(() => {
    reset();
    if (currentSelection) {
      Object.entries(currentSelection).map(([key, value]) =>
        setValue(
          key,
          key === "date" ? new Date(value).toISOString().split("T")[0] : value
        )
      );

      console.log(getValues());
    }
  }, [currentSelection, getValues, reset, setValue]);

  const handleFormSubmit = (taskData) => {
    console.log(taskData);
  };
  const clear = () => {
    setCurrentSelection(null);
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
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Công Việc
                      </label>
                      <input
                        type="text"
                        {...register("name")}
                        className="mt-1 relative block w-full px-3 py-2 mb-2 border-b-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="employees"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nhân Viên
                      </label>
                      <input
                        type="text"
                        {...register("employees")}
                        className="mt-1 relative block w-full px-3 py-2 mb-2 border-b-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Ngày
                      </label>
                      <input
                        type="date"
                        {...register("date")}
                        className="mt-1 relative block w-full px-3 py-2 mb-2 border-b-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
                        placeholder="Select a date"
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

export default TaskForm;
