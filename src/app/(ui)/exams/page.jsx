"use client";
import IsAdmin from "@/components/common/IsAdmin";
import AddExam from "@/components/frontDesign/AddExam/AddExam";
import React from "react";
import useSWR from "swr";
import Exam from "@/components/frontDesign/Exam/Exam";
import Link from "next/link";

import Image from "next/image";
import { BiEdit, BiTrash } from "react-icons/bi";

const Page = () => {
  const {
    data: exams,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/exam`, fetcher);

  console.log(exams);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        Loading...
      </div>
    );
  }

  return (
    <main className=" ">
      <IsAdmin>
        <AddExam refetch={mutate} />
      </IsAdmin>
      <div className="mt-10 flex gap-4 items-center flex-col mx-8 md:mx-30 lg:mx-36">
        {exams?.length !== 0 &&
          exams?.map((exam, index) => (
            <div key={exam._id} className="flex w-full gap-4">
              <Link
                href={`/exams/${exam._id}`}
                className="flex gap-2 shadow-sm border-zinc-600 px-6 border-s-4 rounded-s-xl border-e-4 border-e-zinc-600  py-3 w-full items-center"
              >
                {index + 1}.
                <Exam {...exam} />
              </Link>
              <IsAdmin>
                <button
                  onClick={() => {}}
                  className="flex items-center justify-center gap-2 rounded px-3 py-2 bg-green-500 text-white"
                >
                  <BiEdit /> Edit
                </button>
                <button
                  onClick={()=>{}}
                  className="flex items-center justify-center gap-2 rounded px-3 py-2 bg-red-500 text-white"
                >
                  <BiTrash /> Remove
                </button>
              </IsAdmin>
            </div>
          ))}
      </div>
    </main>
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
