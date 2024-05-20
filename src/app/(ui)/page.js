"use client";

import AddCategory from "@/components/frontDesign/AddCategory/AddCategory";
import Category from "@/components/frontDesign/category/Category";
import useSWR from "swr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IsAdmin from "@/components/common/IsAdmin";

export default function Home() {
  const {
    data: categories,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/category", fetcher);

  return (
    <main className="flex min-h-screen flex-col items-center  ">
      <ToastContainer />
      <div className="flex justify-end">
        <IsAdmin>
          <AddCategory refetch={mutate} />
        </IsAdmin>
      </div>
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

      {!isLoading && (
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-16 sm:mb-0">
          {categories.map((category) => (
            <Category key={category.id} data={category} refetch={mutate} />
          ))}
        </div>
      )}

      {!isLoading && categories.length === 0 && (
        <div className="h-full absolute top-1/2">
          <p className="text-xl text-zinc-400">No Categories</p>
        </div>
      )}
    </main>
  );
}

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch the data");
  }
  const data = await res.json();
  return data.data;
};
