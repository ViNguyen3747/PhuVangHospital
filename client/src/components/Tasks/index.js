import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { CSVLink } from "react-csv";
import TaskForm from "../Forms/TaskForm";
import { GET_TASKS } from "../../utils/graphQL/query";
import { useQuery, useMutation } from "@apollo/client";
import { DELETE_TASK } from "../../utils/graphQL/mutation";
import formatDate from "../../utils/formatDate";
const headers = [
  { label: "Công Việc", key: "taskName" },
  { label: "Nhân Viên", key: "employee" },
  { label: "Ngày", key: "date" },
];
const Tasks = () => {
  const [deleteModal, setDelete] = useState(false);
  const [excelFile, setExcelFile] = useState(null);
  const deleteButtonRef = useRef(null);
  const [currentTask, setcurrentTask] = useState(null);
  const { data } = useQuery(GET_TASKS);
  const [deleteTask] = useMutation(DELETE_TASK);
  useEffect(() => {
    if (data) {
      const tasks = data.tasks.map(
        ({ id, __typename, ...taskInfos }) => taskInfos
      );
      setExcelFile(tasks.map((t) => ({ ...t, date: formatDate(t.date) })));
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
      <div className="col-span-6 sm:col-span-3">
        {" "}
        <input
          type="date"
          className="mt-1 relative block w-7/12 px-3 py-2 mb-2 border-b-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
          placeholder="Select a date"
        />
      </div>
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

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-gray border-b-4 sm:rounded-lg">
              <table className="min-w-full divide-y divide-turquoise">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nhân Viên
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Ngày
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Công Việc
                    </th>

                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Chỉnh sửa</span>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Xóa</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-turquoise">
                  {data &&
                    data.tasks.map((task, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {task.employee}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {formatDate(task.date)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {task.taskName}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div
                            className="text-black hover:text-turquoise cursor-pointer"
                            onClick={() => update(task.id)}
                          >
                            Chỉnh Sửa
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div
                            className="text-black hover:text-brown-light  cursor-pointer"
                            onClick={() => deleteNoti(task.id)}
                          >
                            Xóa
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <TaskForm currentTask={currentTask} setcurrentTask={setcurrentTask} />
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
    </div>
  );
};

export default Tasks;
