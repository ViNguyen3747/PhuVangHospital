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
const FormTable = ({ currentTask, setcurrentTask }) => {
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
    try {
      if (Auth.isAdmin()) {
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
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <table className="ml-4 text-center">
        <thead>
          <tr>
            <th className="px-3.5 py-3 tracking-wider">
              <input
                type="text"
                {...register("employee", {
                  required: "Vui lòng nhập tên nhân viên",
                })}
                className="text-black focus:outline-none sm:text-sm"
              />
              {errors?.employee && (
                <p className="text-brown-light text-sm font-medium italic">
                  {errors.employee.message}
                </p>
              )}
            </th>
            {[...Array(31)].map((e, i) => (
              <th className="even:bg-gray-light px-9 py-3 tracking-wider whitespace-nowrap">
                {i + 1}
              </th>
            ))}

            <th className="border-y border-gray-dark px-6 py-3  whitespace-nowrap">
              <span className="text-black hover:text-turquoise cursor-pointer">
                Thêm
              </span>
            </th>
            <th className="border-y border-gray-dark px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <span className="text-black hover:text-brown-light  cursor-pointer">
                Xóa
              </span>
            </th>
          </tr>
        </thead>
      </table>
    </form>
  );
};

export default FormTable;
