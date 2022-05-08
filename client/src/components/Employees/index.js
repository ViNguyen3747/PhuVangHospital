import React, { useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import EmployeeForm from "../common/EmployeeForm";

const employees = [
  {
    name: "fsdvbs",
    // department: "kjv",
    phone: "786425487",
    email: "fjsdhfg@ksdj.com",
    address: "3245 mcxvn",
  },
  {
    name: "fsdvbs",
    // department: "kjv",
    phone: "786425487",
    email: "fjsdhfg@ksdj.com",
    address: "3245 mcxvn",
  },
  {
    name: "fsdvbs",
    // department: "kjv",
    phone: "786425487",
    email: "fjsdhfg@ksdj.com",
    address: "3245 mcxvn",
  },
  {
    name: "fsdvbs",
    // department: "kjv",
    phone: "786425487",
    email: "fjsdhfg@ksdj.com",
    address: "3245 mcxvn",
  },
  {
    name: "fsdvbs",
    // department: "kjv",
    phone: "786425487",
    email: "fjsdhfg@ksdj.com",
    address: "3245 mcxvn",
  },
];

const Employees = () => {
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const update = (employee) => {
    setCurrentEmployee(employee);
    scroll.scrollToBottom();
  };
  return (
    <div className="place-items-center h-screen">
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
                    {/* <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Khoa
                    </th> */}
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
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Địa Chỉ
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
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {e.department}
                        </div>
                      </td> */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{e.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{e.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{e.address}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div
                          className="text-black hover:text-turquoise cursor-pointer"
                          onClick={() => update(e)}
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
      <EmployeeForm
        currentEmployee={currentEmployee}
        setCurrentEmployee={setCurrentEmployee}
      />
    </div>
  );
};

export default Employees;
