import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { animateScroll as scroll } from "react-scroll";
import Auth from "../../utils/auth";
import { ADD_TASK } from "../../utils/graphQL/mutation";
const initialState = {
  taskName: "",
  date: new Date(),
  employee: "",
};
const TaskForm = ({ currentTask, setcurrentTask }) => {
  const {
    handleSubmit,
    clearErrors,
    setValue,
    register,
    getValues,
    // control,
    reset,
  } = useForm({ defaultValues: initialState });
  const [addTask] = useMutation(ADD_TASK);
  useEffect(() => {
    reset();
    if (currentTask) {
      Object.entries(currentTask).map(([key, value]) =>
        setValue(
          key,
          key === "date" ? new Date(value).toISOString().split("T")[0] : value
        )
      );

      console.log(getValues());
    }
  }, [currentTask, getValues, reset, setValue]);

  const handleFormSubmit = async () => {
    let taskData = getValues();
    console.log(taskData);
    try {
      if (Auth.loggedIn()) {
        if (currentTask) {
        } else {
          const { data } = await addTask({
            variables: {
              input: {
                ...taskData,
              },
            },
          });
          if (data) {
            window.location.assign(`/bangchamcong`);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const clear = () => {
    setcurrentTask(null);
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
                        htmlFor="taskName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Công Việc
                      </label>
                      <input
                        type="text"
                        {...register("taskName")}
                        className="mt-1 relative block w-full px-3 py-2 mb-2 border-b-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="employee"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nhân Viên
                      </label>
                      <input
                        type="text"
                        {...register("employee")}
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
