import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { animateScroll as scroll } from "react-scroll";
import Auth from "../../utils/auth";
import { ADD_TASK, UPDATE_TASK } from "../../utils/graphQL/mutation";
import { GET_TASK } from "../../utils/graphQL/query";
const initialState = {
  employee: "",
  task: Array(31).fill(" "),
};
const TaskForm = ({ currentTask, setcurrentTask }) => {
  const {
    handleSubmit,
    clearErrors,
    setValue,
    register,
    getValues,
    control,
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
      scroll.scrollToTop();
      let { createdAt, id, __typename, ...taskInfo } = data.task;
      Object.entries(taskInfo).map(([key, value]) => setValue(key, value));
      console.log(getValues());
    }
  }, [data, getValues, reset, setValue, clearErrors]);

  const handleFormSubmit = async (taskData) => {
    console.log(taskData);
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
  const taskList = (event, index) => {
    const list = getValues("task");
    list[index] = event.target.value;
    setValue("task", list);
  };
  return (
    <div className="md:container pb-10 border-b-2 border-gray">
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
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
                          required: "Vui lòng nhập tên nhân viên",
                        })}
                        className="mt-1 relative block  px-3 py-2 mb-2 border-b-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
                      />
                      {errors?.employee && (
                        <p className="text-brown-light text-sm font-medium italic">
                          {errors.employee.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-4 overflow-x-auto">
                      <table className="divide-y divide-turquoise mb-3">
                        <thead>
                          <tr>
                            {[...Array(31)].map((e, i) => (
                              <th className=" text-left text-xs font-medium ">
                                {i + 1}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="">
                          <Controller
                            control={control}
                            name="task"
                            render={({ field: { onChange } }) => (
                              <>
                                {getValues("task").map((e, i) => (
                                  <td className="px-0 py-2 whitespace-nowrap">
                                    <input
                                      type="text"
                                      value={getValues("task")[i]}
                                      onChange={(event) => taskList(event, i)}
                                      className="ml-3 text-black focus:outline-none sm:text-sm"
                                    />
                                  </td>
                                ))}
                              </>
                            )}
                          />
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-left sm:px-6">
                  <button className="min-w-min py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-gradient-to-r from-turquoise to-blue duration-500 ease-out">
                    Nhập
                  </button>
                </div>
              </div>
            </form>

            <div className="px-4 py-3 bg-gray-50 text-left sm:px-6">
              <button
                className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-gradient-to-r from-gray to-gray-darkest duration-500 ease-out"
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
