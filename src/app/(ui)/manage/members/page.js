"use client";
import IsAdmin from "@/components/common/IsAdmin";
import AddStudent from "@/components/frontDesign/AddStudent/AddStudent";
import StudentCard from "@/components/frontDesign/StudentCard/StudentCard";
import Search from "antd/es/input/Search";
import { NEXT_URL } from "next/dist/client/components/app-router-headers";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSWR from "swr";

const Page = () => {

  const [url, setUrl] = useState("/api/user");

  const {
    data: members,
    error,
    isLoading,
    mutate,
  } = useSWR(`${url}`, fetcher);




  const onSearch = (value) => {
      setUrl((prev) =>{
        return `/api/user?search=${value}`
      })

      mutate();
  };

  console.log(members);

  return (
    <>
      <ToastContainer />
      <IsAdmin>
     
      <main className="flex min-h-screen flex-col items-center  ">
        {error && (
          <div className="flex justify-center items-center">
            <p className="text-red-500">Failed to fetch the data</p>
          </div>
        )}
        {isLoading && (
          <div className="h-full absolute top-1/2">
            <p className="animate-pulse text-white text-xl">Loading....</p>
          </div>
        )}
        <div className="my-4">
          <Search
            placeholder="input search email"
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
        </div>

        {!isLoading && (
          <div className="flex flex-col  gap-3 mb-16 sm:mb-0">
            <div className="overflow-x-auto">
              <table className="table table-zebra mt-4">
                {/* head */}
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {members?.map((member, index) => (
                    <StudentCard
                    refetch={mutate}
                      index={index + 1}
                      key={member._id}
                      data={member}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {members?.length === 0 && (
          <div className="h-full absolute top-1/2">
            <p className="text-xl text-zinc-400">No members</p>
          </div>
        )}
      </main>
      </IsAdmin>
    </>
  );
};

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch the data");
  }
  const data = await res.json();
  console.log(data);

  return data.data;
};

export default Page;
