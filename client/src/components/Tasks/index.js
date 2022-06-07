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
    console.log(data);
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
      {/* <div className="col-span-6 sm:col-span-4">
        <label className="block text-sm font-medium text-gray-700">Khoa</label>
        <select
          required
          className="mt-1 relative block w-7/12 px-3 py-2 mb-2 border-b-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
        >
          <option>sdgvfsrbg</option>
          <option>sdfbgd </option>
          <option>sbdggnh</option>
        </select>
      </div> */}
      <div className="py-3 align-middle min-w-full sm:px-10 lg:px-20">
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

                  {/* This element is to trick the browser into centering the modal contents. */}
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
                      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => handleDelete()}
                        >
                          Xóa
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
        {data && (
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

            {/* <table className="ml-4  text-center">
              <thead>
                <tr>
                  <th className=" px-6 py-3 tracking-wider">Nhân Viên</th>
                  {[...Array(31)].map((e, i) => (
                    <th className="even:bg-gray-light px-6 py-3 tracking-wider whitespace-nowrap">
                      {i + 1}
                    </th>
                  ))}
                  {Auth.isAdmin() && (
                    <>
                      {" "}
                      <th className=" px-6 py-3 tracking-wider whitespace-nowrap">
                        <span className="sr-only">Chỉnh sửa</span>
                      </th>
                      <th className=" px-6 py-3 tracking-wider whitespace-nowrap">
                        <span className="sr-only">Xóa</span>
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.tasks.map((task, index) => (
                  <tr key={index}>
                    <td className="border-y border-gray-dark px-6 py-3  whitespace-nowrap">
                      {task.employee}
                    </td>
                    {task.task.map((t) => (
                      <td className="even:bg-gray-light border-y border-gray-dark px-6 py-3  whitespace-nowrap">
                        {t}
                      </td>
                    ))}
                    {Auth.isAdmin() && (
                      <>
                        <td className="border-y border-gray-dark px-6 py-3  whitespace-nowrap">
                          <span
                            className="text-black hover:text-turquoise cursor-pointer"
                            onClick={() => update(task.id)}
                          >
                            Chỉnh Sửa
                          </span>
                        </td>
                        <td className="border-y border-gray-dark px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <span
                            className="text-black hover:text-brown-light  cursor-pointer"
                            onClick={() => deleteNoti(task.id)}
                          >
                            Xóa
                          </span>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table> */}
          </>
        )}
      </div>
      {data && (
        <div id="my-tb" className="pb-7">
          <div className="name-col">
            <p className="width-set-r  ">Nhân Viên</p>
            {data.tasks.map((usr_data, index) => {
              return <p className="width-set">{usr_data.employee}</p>;
            })}
          </div>
          <div className="data-col customize-scrollbar">
            <table>
              <div className="row-tb">
                {[...Array(31)].map((e, i) => {
                  return (
                    <div className="row-tb">
                      <p className=" odd:bg-gray-light cell">{i + 1}</p>
                    </div>
                  );
                })}
              </div>
              {data.tasks.map((task_dt, index) => {
                return (
                  <div className="row-tb">
                    {task_dt.task.map((check, index) => {
                      return <p className="cell">{check}</p>;
                    })}
                  </div>
                );
              })}
            </table>
          </div>
          <div className="btn-col">
            <p className="width-set-l"></p>
            {data.tasks.map((usr_data, index) => {
              return (
                <div className="width-set">
                  <button>
                    {" "}
                    <span
                      className="text-black hover:text-turquoise cursor-pointer"
                      onClick={() => update(usr_data.id)}
                    >
                      Chỉnh Sửa
                    </span>
                  </button>
                  <button className="ml-11">
                    {" "}
                    <span
                      className="text-black hover:text-brown-light  cursor-pointer"
                      onClick={() => deleteNoti(usr_data.id)}
                    >
                      Xóa
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
