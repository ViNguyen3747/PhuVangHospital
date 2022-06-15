import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { CSVLink } from "react-csv";
import TaskForm from "../Forms/TaskForm";
import { GET_TASKS } from "../../utils/graphQL/query";
import { useQuery, useMutation } from "@apollo/client";
import { DELETE_TASK } from "../../utils/graphQL/mutation";
import Auth from "../../utils/auth";
const Tasks = () => {
  const [deleteModal, setDelete] = useState(false);
  const [excelFile, setExcelFile] = useState(null);
  const deleteButtonRef = useRef(null);
  const [currentTask, setcurrentTask] = useState(null);
  const { data } = useQuery(GET_TASKS);
  const [deleteTask] = useMutation(DELETE_TASK);

  const days = Array.from(Array(31), (value, index) => ({
    label: (index + 1).toString(),
    key: index.toString(),
  }));
  const headers = [{ label: "Nhân Viên", key: "employee" }, ...days];
  useEffect(() => {
    if (data) {
      console.log(data);
      const tasks = data.tasks.map(
        ({ id, __typename, ...taskInfos }) => taskInfos
      );

      setExcelFile(
        tasks.map((t) => ({
          ...t.task,
          employee: t.employee,
        }))
      );
    }
  }, [data]);
  const update = (task) => {
    setcurrentTask(task);
  };

  const deleteNoti = (id) => {
    setcurrentTask(id);
    setDelete(true);
  };
  const handleDelete = async () => {
    const { data } = await deleteTask({
      variables: { deleteTaskId: currentTask },
    });
    setDelete(false);
    if (data) window.location.assign("/bangchamcong");
  };
  return (
    <div className="place-items-center h-screen">
      <div className=" min-w-full sm:px-10 lg:px-16">
        {Auth.isAdmin() && (
          <>
            <TaskForm
              currentTask={currentTask}
              setcurrentTask={setcurrentTask}
            />
            <Transition.Root show={deleteModal} as={Fragment}>
              <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={deleteButtonRef}
                onClose={setDelete}
              >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Dialog.Overlay className="fixed inset-0 bg-gray bg-opacity-75 transition-opacity" />
                  </Transition.Child>

                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow sm:mx-0 sm:h-10 sm:w-10">
                            <ExclamationIcon
                              className="h-6 w-6 text-red-600"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <Dialog.Title
                              as="h1"
                              className="text-xl font-medium text-brown"
                            >
                              Xoá công việc
                            </Dialog.Title>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 pb-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => handleDelete()}
                        >
                          Xóa
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => setDelete(false)}
                          ref={deleteButtonRef}
                        >
                          Thoát
                        </button>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>
          </>
        )}
        <br />
        {data && Auth.isAdmin() && (
          <>
            {excelFile && (
              <CSVLink
                data={excelFile}
                headers={headers}
                filename="bangchamcong.csv"
                className="whitespace-nowrap inline-flex px-1 py-1 m-4 rounded-md shadow-sm font-small text-white bg-gray-dark hover:bg-gray hover:text-gray-dark ease-in-out"
                targe="_blank"
              >
                Export File
              </CSVLink>
            )}
          </>
        )}
      </div>
      {data && (
        <div className="flex ml-3 pb-7 text-center  sm:px-10 lg:px-16">
          <div>
            <p className="h-10 p-2 border-b border-r border-turquoise whitespace-nowrap">
              Nhân Viên
            </p>
            {data.tasks.map((usr_data, index) => {
              return (
                <p className="h-13 p-2 border-b border-r border-turquoise whitespace-nowrap overflow-x-scroll">
                  {usr_data.employee}
                </p>
              );
            })}
          </div>
          <div className="overflow-x-auto width-set ">
            <table>
              <div className="flex">
                {[...Array(31)].map((e, i) => {
                  return (
                    <div className="h-10 p-2 w-96 border-b border-r border-gray whitespace-nowrap">
                      <span>{i + 1}</span>
                    </div>
                  );
                })}
              </div>
              {data.tasks.map((task_dt, index) => {
                return (
                  <div className="flex text-center">
                    {task_dt.task.map((task) => {
                      return task.map((t, j) => (
                        <p
                          className={`${
                            j === 2
                              ? " bg-gray-light"
                              : j === 0
                              ? "bg-turquoise-lightest"
                              : ""
                          } h-13 p-2 w-32 border-b border-r border-gray overflow-x-scroll whitespace-nowrap`}
                        >
                          {t}
                        </p>
                      ));
                    })}
                  </div>
                );
              })}
            </table>
          </div>
          {Auth.isAdmin() && (
            <div className="w-40">
              <p className="h-10 border-b border-l border-gray"></p>
              {data.tasks.map((usr_data, index) => {
                return (
                  <div className="h-13 text-center border-b border-l border-gray overflow-x-scroll">
                    <button
                      onClick={() => update(usr_data.id)}
                      className="text-black hover:text-turquoise cursor-pointer h-10 whitespace-nowrap"
                    >
                      Chỉnh Sửa
                    </button>
                    <button
                      onClick={() => deleteNoti(usr_data.id)}
                      className="text-black hover:text-brown-light cursor-pointer h-10 px-5 whitespace-nowrap"
                    >
                      Xóa
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tasks;
