"use client";

import Link from "next/link";
import React, { useState } from "react";
import { baseUrl } from "../../../config";
import axios from "axios";
import { toast } from "react-toastify";

const page = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    permalink: "",
    phone: "",
    password: "",
  });

  const onchangeHandeler = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandeler = async (e) => {
    e.preventDefault();
    try {
      const url = `${baseUrl}/api/v1/users/register`;
      const res = await axios.post(url, { ...userData });

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setUserData({
          name: "",
          email: "",
          permalink: "",
          phone: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="pageArea flex justify-start items-center h-screen p-10 flex-col">
        <div className="flex bg-white container mx-auto p-5 rounded-md flex justify-between">
          <h1 className="text-2xl">
            <b>Create User</b>
          </h1>

          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            <Link href={"/"} as={"/"}>
              Home
            </Link>
          </button>
        </div>
        <div className="flex bg-white container max-w-3xl p-5 rounded-md flex justify-between mt-5">
          <form
            className="space-y-6 w-full"
            onSubmit={(e) => submitHandeler(e)}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User Name{" "}
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={onchangeHandeler}
                  type="text"
                  className="block w-full p-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User Email{" "}
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={onchangeHandeler}
                  type="email"
                  className="block w-full p-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="permalink"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User Permalink{" "}
              </label>
              <div className="mt-2">
                <input
                  id="permalink"
                  name="permalink"
                  value={userData.permalink}
                  onChange={onchangeHandeler}
                  type="text"
                  className="block w-full p-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User Phone{" "}
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  value={userData.phone}
                  onChange={onchangeHandeler}
                  name="phone"
                  type="tel"
                  className="block w-full p-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User Password{" "}
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  value={userData.password}
                  onChange={onchangeHandeler}
                  name="password"
                  type="text"
                  className="block w-full p-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create User
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default page;
