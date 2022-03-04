import React from "react";
import { animateScroll as scroll } from "react-scroll";

import Form from "../common/Form";

const Tasks = () => {
  const tasks = [
    {
      name: "ABC",
      date: Date.now(),
      employees: ["A", "B", "C"],
    },
    {
      name: "ABC",
      date: Date.now(),
      employees: ["A", "B", "C"],
    },
    {
      name: "ABC",
      date: Date.now(),
      employees: ["A", "B", "C"],
    },
    {
      name: "ABC",
      date: Date.now(),
      employees: ["A", "B", "C"],
    },
    {
      name: "ABC",
      date: Date.now(),
      employees: ["A", "B", "C"],
    },
    {
      name: "ABC",
      date: Date.now(),
      employees: ["A", "B", "C"],
    },
    {
      name: "ABC",
      date: Date.now(),
      employees: ["A", "B", "C"],
    },
  ];

  const update = () => {
    scroll.scrollToBottom();
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
      <div className="col-span-6 sm:col-span-4">
        <label className="block text-sm font-medium text-gray-700">Khoa</label>
        <select
          required
          className="mt-1 relative block w-7/12 px-3 py-2 mb-2 border-b-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
        >
          <option>sdgvfsrbg</option>
          <option>sdfbgd </option>
          <option>sbdggnh</option>
        </select>
      </div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray border-b-4 sm:rounded-lg">
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
                  {tasks.map((task) => (
                    <tr key={task.name}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {task.employees}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{task.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{task.name}</div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div
                          className="text-black hover:text-turquoise cursor-pointer"
                          onClick={update}
                        >
                          Chỉnh Sửa
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-black hover:text-brown-light"
                        >
                          Xóa
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Form />
    </div>
  );
};

export default Tasks;
