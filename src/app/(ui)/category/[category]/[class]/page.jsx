"use client";

import useSWR from "swr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname } from "next/navigation";
import ClassCard from "@/components/frontDesign/ClassCard/ClassCard";
import AddClass from "@/components/frontDesign/AddClass/AddClass";
import IsAdmin from "@/components/common/IsAdmin";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import IsAuthorized from "@/components/common/IsAuthorized";

const Video = dynamic(() => import("@/components/frontDesign/video/Video"), {
  ssr: false,
});

export default function Page() {
  const pathName = usePathname();

  const chapterSlug = pathName.split("/")[3];
  const [videoSrc, setVideoSrc] = useState("");
  const [videoTitle, setVideoTitle] = useState("");

  console.log(chapterSlug);

  let {
    data: classes,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/classes?chapterSlug=${chapterSlug}`, fetcher);

  useEffect(() => {
    if (classes === "undefined") {
      classes = [];
    }

    if (!isLoading && classes.length !== 0) {
      setVideoSrc(classes[0].video);
    }
  }, [classes, isLoading]);

  return (
    <main className="flex min-h-screen flex-col items-center  ">
      <ToastContainer />
      <div className="flex justify-end mb-4">
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

      <IsAuthorized>

      <div className="flex md:flex-row flex-col w-full">
        <div className="w-full md:w-8/12">
          {!isLoading && classes.length !== 0 && <Video videoTitle={videoTitle} videoSrc={videoSrc} />}
        </div>
        <div className="w-full md:w-4/12">
          {!isLoading && (
            <div className="w-full mt-4">
              {classes?.map((singleClass, index) => (
                <ClassCard
                setVideoTitle={setVideoTitle}
                  currVideoSrc={videoSrc}
                  setVideoSrc={setVideoSrc}
                  classNo={index + 1}
                  singleClass={singleClass}
                  key={singleClass.slug}
                />
              ))}
            </div>
          )}
          {classes?.length === 0 && (
            <div className="h-full absolute top-1/2">
              <p className="text-xl text-zinc-400">No Classes</p>
            </div>
          )}
        </div>
      </div>
      </IsAuthorized>

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
