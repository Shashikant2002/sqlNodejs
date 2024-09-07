"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { baseUrl } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";

const page = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState({});
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [deleted, setDeleted] = useState(0);

  const [orderBy, setOrderBy] = useState("");

  const fetchDataFunc = async (p = page) => {
    try {
      setLoading(true);
      const url = `${baseUrl}/api/v1/users/get/all/users?limit=${limit}&page=${p}&search=${search}${
        deleted == 0 ? "" : `&deleted=${deleted - 1}`
      }${orderBy ? `&orderby=${orderBy}` : ""}`;

      const res = await axios.get(url);

      if (res.data.success) {
        setLoading(false);
        setUsers(res.data.data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const searchSubmitHandeler = (e) => {
    e.preventDefault();
    setPage(1);
    fetchDataFunc(1);
  };

  const fetchData = useCallback(fetchDataFunc, [page, limit, deleted, orderBy]);

  useEffect(() => {
    fetchData();
  }, [page, limit, deleted, orderBy]);

  const deleteDataPer = async (id) => {
    try {
      setLoading(true);
      const url = `${baseUrl}/api/v1/users/delete/user/${id}`;

      const res = await axios.delete(url);

      if (res.data.success) {
        toast.success(res?.data?.message);
        fetchDataFunc();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
      setLoading(false);
    }
  };
  const togleDeleteData = async (id) => {
    try {
      setLoading(true);
      const url = `${baseUrl}/api/v1/users/delete/user/${id}`;

      const res = await axios.patch(url, {});

      if (res.data.success) {
        toast.success(res?.data?.message);
        fetchDataFunc();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <Loader /> : ""}
      <div className="pageArea flex justify-start items-center flex-col h-screen p-20">
        <div className="flex bg-white container mx-auto p-5 rounded-md flex justify-between">
          <h1 className="text-2xl">
            <b>All Users </b>
          </h1>

          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 light:bg-blue-600 light:hover:bg-blue-700 focus:outline-none light:focus:ring-blue-800"
          >
            <Link href={"/create-user"} as={"/create-user"}>
              Add Users
            </Link>
          </button>
        </div>

        <div className="flex bg-white container mx-auto p-5 gap-3 rounded-md flex items-center justify-between mt-3">
          <div className="flex gap-3">
            <select
              value={deleted}
              onChange={(e) => setDeleted(e.target.value)}
              style={{ width: 250 }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
            >
              <option value={0}>Deleted or Not (None)</option>
              <option value={1}>Deleted</option>
              <option value={2}>Not Deleted</option>
            </select>

            <select
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
              style={{ width: 250 }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
            >
              <option value={""}>Order By (None)</option>
              <option value={"userid"}>userid</option>
              <option value={"permalink"}>permalink</option>
              <option value={"name"}>name</option>
              <option value={"email"}>email</option>
              <option value={"phone"}>phone</option>
              <option value={"enabled"}>enabled</option>
              <option value={"deleted"}>deleted</option>
              <option value={"createdat"}>createdat</option>
            </select>
          </div>

          <form
            className="max-w-md"
            style={{ width: "500px" }}
            onSubmit={searchSubmitHandeler}
          >
            <label
              for="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only light:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 light:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="flex bg-white container mx-auto p-5 rounded-md flex justify-between mt-3">
          <div className="relative overflow-x-auto w-full">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    User Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Prema Link
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Enabled
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Is Delete
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Registered At
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.users?.map((ele) => {
                  return (
                    <tr className="bg-white border-b light:bg-gray-800 light:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap light:text-white"
                      >
                        {ele?.userid}
                      </th>
                      <td className="px-6 py-4"> {ele?.permalink}</td>
                      <td className="px-6 py-4"> {ele?.name}</td>
                      <td className="px-6 py-4"> {ele?.email}</td>
                      <td className="px-6 py-4"> {ele?.phone}</td>
                      <td className="px-6 py-4">
                        {ele?.enabled == 1 ? "Enabled" : "Disabled"}
                      </td>
                      <td className="px-6 py-4">
                        {" "}
                        {/* {ele?.deleted}{" "} */}
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            value=""
                            checked={ele?.deleted == 1 ? false : true}
                            className="sr-only peer"
                          />
                          <div
                            onClick={() => {
                              togleDeleteData(ele?.userid);
                            }}
                            className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 light:peer-focus:ring-blue-800 rounded-full peer light:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all light:border-gray-600 peer-checked:bg-blue-600"
                          ></div>
                        </label>
                      </td>
                      <td className="px-6 py-4">
                        {" "}
                        {new Date(ele?.createdat).toUTCString()}
                      </td>
                      <td className="px-6 py-4">
                        {" "}
                        <button
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 light:bg-blue-600 light:hover:bg-blue-700 focus:outline-none light:focus:ring-blue-800"
                        >
                          <Link
                            href={`/edit-user/[userid]`}
                            as={`/edit-user/${ele.userid}`}
                          >
                            Edit User
                          </Link>
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        {" "}
                        <button
                          onClick={() => {
                            deleteDataPer(ele?.userid);
                          }}
                          type="button"
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 light:bg-red-600 light:hover:bg-red-700 light:focus:ring-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex bg-white container mx-auto p-5 rounded-md flex justify-between mt-3 items-center">
          <div className="contentn flex gap-3">
            <p className="text-lg">
              Total Pages: <b>{users?.totalPages}</b>
            </p>
            <p className="text-lg">
              Total Users: <b>{users?.totalCount}</b>
            </p>
          </div>

          <div className="buttons flex items-center">
            <select
              onChange={(e) => setLimit(e.target.value)}
              value={limit}
              className="me-3"
            >
              <option value="1">1</option>
              <option value="3">3</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>

            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 light:bg-blue-600 light:hover:bg-blue-700 focus:outline-none light:focus:ring-blue-800"
              disabled={page <= 1 ? true : false}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev Page
            </button>

            <h3 className="text-2xl me-5 ms-5">{page}</h3>

            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 light:bg-blue-600 light:hover:bg-blue-700 focus:outline-none light:focus:ring-blue-800"
              disabled={page >= users?.totalPages ? true : false}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next Page
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
