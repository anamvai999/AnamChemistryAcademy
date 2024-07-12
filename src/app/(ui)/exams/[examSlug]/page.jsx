"use client";

import isoTimeFormatter from "@/utils/isoTimeFormatter";
import { usePathname } from "next/navigation";
import React from "react";
import useSWR from "swr";

const Page = () => {
  const pathName = usePathname();

  const examSlug = pathName.split("/")[2];

  const {
    data: exam,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/exam?examSlug=${examSlug}`, fetcher);

  if(isLoading){
    return <div className="flex justify-center items-center h-[80vh]">
      Loading...
    </div>
  }

  const date = isoTimeFormatter(exam?.createdAt) ;

  return (
    <div className="flex flex-col gap-4 mx-10 md:mx-40 h-full">
      <div className="flex justify-between">
        <h2 className="text-zinc-400">{exam?.examTitle}</h2>
        <p className="text-zinc-400">{date}</p>
      </div>
      <iframe height="520" className="rounded-lg" src={exam?.examLink}>
        Loading...
      </iframe>
    </div>
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
