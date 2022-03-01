import React from "react";
import { animateScroll as scroll } from "react-scroll";
import EmployeeForm from "../common/EmployeeForm";
const Employees = () => {
  const employees = [
    {
      name: "fsdvbs",
      department: "kjv",
      phone: "786425487",
      email: "fjsdhfg@ksdj.com",
    },
    {
      name: "fsdvbs",
      department: "kjv",
      phone: "786425487",
      email: "fjsdhfg@ksdj.com",
    },
    {
      name: "fsdvbs",
      department: "kjv",
      phone: "786425487",
      email: "fjsdhfg@ksdj.com",
    },
    {
      name: "fsdvbs",
      department: "kjv",
      phone: "786425487",
      email: "fjsdhfg@ksdj.com",
    },
    {
      name: "fsdvbs",
      department: "kjv",
      phone: "786425487",
      email: "fjsdhfg@ksdj.com",
    },
    {
      name: "fsdvbs",
      department: "kjv",
      phone: "786425487",
      email: "fjsdhfg@ksdj.com",
    },
    {
      name: "fsdvbs",
      department: "kjv",
      phone: "786425487",
      email: "fjsdhfg@ksdj.com",
    },
  ];
  const update = () => {
    scroll.scrollToBottom();
  };
  return (
    <div className="place-items-center h-screen">
      <div className="col-span-6 sm:col-span-3">
        {" "}
        <select
          name="department"
          className="relative block w-7/12 px-3 py-3 mb-10 border-b-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
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
                      Họ và Tên
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Khoa
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      SĐT
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
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
                  {employees.map((e) => (
                    <tr key={e.name}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{e.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {e.department}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{e.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{e.email}</div>
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
      <EmployeeForm />
    </div>
  );
};

export default Employees;
