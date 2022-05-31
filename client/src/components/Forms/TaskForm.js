import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { animateScroll as scroll } from "react-scroll";
import Auth from "../../utils/auth";
import { ADD_TASK, UPDATE_TASK } from "../../utils/graphQL/mutation";
import { GET_TASK } from "../../utils/graphQL/query";
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
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialState,
  });
  const [addTask] = useMutation(ADD_TASK);
  const [updateTask] = useMutation(UPDATE_TASK);
  const { data } = useQuery(GET_TASK, { variables: { taskId: currentTask } });

  useEffect(() => {
    reset();
    if (data) {
      clearErrors();
      scroll.scrollToBottom();
      let { createdAt, id, __typename, ...taskInfo } = data.task;
      Object.entries(taskInfo).map(([key, value]) =>
        setValue(
          key,
          key === "date" ? new Date(value).toISOString().split("T")[0] : value
        )
      );
      console.log(getValues());
    }
  }, [data, getValues, reset, setValue, clearErrors]);

  const handleFormSubmit = async (taskData) => {
    try {
      if (Auth.loggedIn()) {
        if (currentTask) {
          const { data } = await updateTask({
            variables: {
              updateTaskId: currentTask,
              input: {
                ...taskData,
              },
            },
          });
          if (data) {
            window.location.assign(`/bangchamcong`);
          }
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
                        {...register("taskName", {
                          required: "Nhập tên công việc",
                        })}
                        className="mt-1 relative block w-full px-3 py-2 mb-2 border-b-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
                      />
                      {errors?.taskName && (
                        <p className="text-brown-light text-sm font-medium italic">
                          {errors.taskName.message}
                        </p>
                      )}
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
                        {...register("employee", {
                          required: "Nhập tên nhân viên",
                        })}
                        className="mt-1 relative block w-full px-3 py-2 mb-2 border-b-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
                      />
                      {errors?.employee && (
                        <p className="text-brown-light text-sm font-medium italic">
                          {errors.employee.message}
                        </p>
                      )}
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
                        {...register("date", {
                          required: "Chọn ngày",
                        })}
                        className="mt-1 relative block w-full px-3 py-2 mb-2 border-b-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
                      />
                      {errors?.date && (
                        <p className="text-brown-light text-sm font-medium italic">
                          {errors.date.message}
                        </p>
                      )}
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
                className="group relative w-full flex justify-center  py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-gradient-to-r from-gray to-gray-darkest duration-500 ease-out"
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
