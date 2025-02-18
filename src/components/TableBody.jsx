import React, { useState, useRef } from "react";
import { ArrowUpDown } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeStatus,
  selectFilteredData,
  selectSortingOptions,
  setSortingOptions,
} from "../slices/TableSlice";
import TableFooter from "./TableFooter";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCheckCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function TableBody() {
  const sortConfig = useSelector((state) =>
    selectSortingOptions(state)
  ).sortConfig;
  const filteredData = useSelector((state) => selectFilteredData(state));
  const status = [
    { status: "active", element: faCheckCircle },
    { status: "inactive", element: faInfoCircle },
    { status: "blocked", element: faBan },
  ];
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const ref = useRef(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const intersectionObserver = new IntersectionObserver((entries) => {
    entries.map((entry) => {
      if (entry.isIntersecting) {
        setLoading(true);
        console.log("sdsdsd");
        intersectionObserver.unobserve(entry.target);
        setTimeout(() => {
          setItemsPerPage(10);
          setLoading(false);
        }, 1000);
        console.log("LOADING");
      }
    });
  });

  function handleColumnSort(e) {
    const newSortConfig = {
      key: e.target.name,
      direction:
        sortConfig.key === e.target.name && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    };
    dispatch(setSortingOptions({ data: newSortConfig, type: "sortConfig" }));
  }

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key)
      return <ArrowUpDown className="w-4 h-4 opacity-50" />;
    return <ArrowUpDown className="w-4 h-4" />;
  };

  function handleStatusChange(status, id) {
    console.log(status, id);
    dispatch(handleChangeStatus({ status, id }));
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <div className="bg-white mt-5  shadow rounded-2xl overflow-hidden ">
        <div className="p-10 overflow-x-auto ">
          <table className="w-full">
            <thead>
              <tr className="rounded-2xl text-xl font-normal text-gray-500">
                <th className="px-6 py-4 text-left ">
                  <button
                    onClick={handleColumnSort}
                    name="name"
                    className="flex items-center rounded-2xl gap-2"
                  >
                    Name {renderSortIcon("name")}
                  </button>
                </th>
                <th className="px-6 py-4 text-left ">
                  <button
                    onClick={handleColumnSort}
                    className="flex items-center gap-2"
                    name="email"
                  >
                    Email {renderSortIcon("email")}
                  </button>
                </th>
                <th className="px-6 py-4 text-left ">
                  <button
                    onClick={handleColumnSort}
                    className="flex items-center gap-2"
                    name="date"
                  >
                    Start Date {renderSortIcon("date")}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={handleColumnSort}
                    name="invitedBy"
                    className="flex items-center gap-2"
                  >
                    Invited By {renderSortIcon("invitedBy")}
                  </button>
                </th>
                <th className="px-6 py-4 text-left ">
                  <button
                    onClick={handleColumnSort}
                    name="status"
                    className="flex items-center gap-2"
                  >
                    Status {renderSortIcon("status")}
                  </button>
                </th>
                <th className="px-6 py-4 text-left ">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((user) => (
                <tr
                  key={user.id}
                  ref={(currRef) => {
                    if (itemsPerPage == 5) {
                      if (ref.current) {
                        intersectionObserver.unobserve(ref.current);
                      }
                      intersectionObserver.observe(currRef);
                      ref.current = currRef;
                    }
                    return () => intersectionObserver.unobserve(currRef);
                  }}
                  className=" hover:bg-gray-50 border-b-[1px] py-8 border-b-gray-300"
                >
                  <td className="px-6 py-4 text-lg text-black font-semibold">
                    {user.about.name}
                  </td>
                  <td className="px-6 py-4 text-lg">{user.about.email}</td>
                  <td className="px-6 py-4 text-lg">{user.details.date}</td>
                  <td className="px-6 py-4 text-lg">
                    {user.details.invitedBy}
                  </td>
                  <td className="px-6 py-4 text-lg">
                    <p
                      className={`w-[200px] text-center py-3 rounded-xl text-xl font-semibold ${
                        user.about.status.toLowerCase() === "active"
                          ? "bg-green-100 text-green-800 border-green-500 border-[1px]"
                          : user.about.status.toLowerCase() === "blocked"
                          ? "bg-red-100 text-red-800 border-red-500 border-[1px]"
                          : "bg-blue-100 text-blue-800 border-blue-500 border-[1px]"
                      }`}
                    >
                      {user.about.status[0].toUpperCase() +
                        user.about.status.substring(1).toLowerCase()}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div style={{ display: "flex", gap: "10px" }}>
                      {status.map(({ element, status }, index) => (
                        <div
                        key={status}
                          onClick={() => handleStatusChange(status, user.id)}
                          className="cursor-pointer"
                          style={{
                            background: `${
                              status == "inactive"
                                ? "#ffe6e6"
                                : `${
                                    status == "active" ? "#e6fff2" : "#f2f2f2"
                                  }`
                            }`,
                            padding: "10px",
                            borderRadius: "8px",
                            border: `1px solid ${
                              status == "inactive"
                                ? "#ff4d4d"
                                : `${status == "active" ? "#00cc66" : "#ccc"}`
                            }`,
                          }}
                        >
                          <FontAwesomeIcon
                            icon={element}
                            color={`${
                              status == "inactive"
                                ? "#ff4d4d"
                                : `${status == "active" ? "#00cc66" : "#666"}`
                            }`}
                            size="lg"
                          />
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
              {loading && (
                <tr>
                <td colSpan={6} className="text-center py-6">
                  <div className="inline-block w-10 h-10 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
                </td>
              </tr>
              
              )}
            </tbody>
          </table>
        </div>
      </div>
      <TableFooter
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
