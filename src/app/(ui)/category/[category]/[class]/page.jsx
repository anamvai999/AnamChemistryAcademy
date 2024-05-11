"use client";

import useSWR from "swr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname } from "next/navigation";
import ClassCard from "@/components/frontDesign/ClassCard/ClassCard";
import AddClass from "@/components/frontDesign/AddClass/AddClass";
import IsAdmin from "@/components/common/IsAdmin";

export default function Page() {
  const pathName = usePathname();

  const chapterSlug = pathName.split("/")[3];

  console.log(chapterSlug);

  const {
    data: classes,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/classes?chapterSlug=${chapterSlug}`, fetcher);


  console.log(classes);


  return (
    <main className="flex min-h-screen flex-col items-center  ">
      <ToastContainer />
      <div className="flex justify-end">
        <IsAdmin>
          <AddClass chapterSlug={chapterSlug} refetch={mutate} />
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
        <div className="">
          {classes?.map((singleClass, index) => (
            <ClassCard classNo={index+1} singleClass={singleClass} key={singleClass.slug} />
          ))}
        </div>
      )}
      {classes?.length === 0 && (
        <div className="h-full absolute top-1/2">
          <p className="text-xl text-zinc-400">No Classes</p>
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
  console.log(data);

  return data.data;
};
