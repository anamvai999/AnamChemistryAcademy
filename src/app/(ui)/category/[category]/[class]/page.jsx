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

// Dynamically load the Video component for client-side rendering
const Video = dynamic(() => import("@/components/frontDesign/video/Video"), {
  ssr: false,
});

export default function Page() {
  const pathName = usePathname();

  const chapterSlug = pathName.split("/")[3];
  const [videoSrc, setVideoSrc] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  console.log(chapterSlug);

  // Fetch classes data using SWR
  const { data: classes, error, isLoading, mutate } = useSWR(
    `/api/classes?chapterSlug=${chapterSlug}`,
    fetcher
  );

  // Set video source after fetching classes
  useEffect(() => {
    if (!isLoading && classes && classes.length !== 0) {
      setVideoSrc(classes[0].video);
      setVideoTitle(classes[0].title); // Set video title too if needed
    }
  }, [classes, isLoading]);

  // Prevent right-click (basic protection)
  const preventRightClick = (e) => {
    e.preventDefault();
  };

  // Handle video loading state
  const handleVideoLoaded = () => {
    setIsVideoLoading(false);
  };

  return (
    <main
      onContextMenu={preventRightClick}
      className="flex min-h-screen flex-col items-center"
    >
      <ToastContainer />

      {/* Display admin panel to add classes */}
      <div className="flex justify-end mb-4">
        <IsAdmin>
          <AddClass chapterSlug={chapterSlug} refetch={mutate} />
        </IsAdmin>
      </div>

      {/* Error handling */}
      {error && (
        <div className="flex justify-center items-center">
          <p className="text-red-500">Failed to fetch the data</p>
        </div>
      )}

      {/* Loading state for fetching classes */}
      {isLoading && (
        <div className="flex justify-center items-center min-h-screen">
          <p className="animate-pulse text-white text-xl">Loading....</p>
        </div>
      )}

      {/* Authorized content */}
      <IsAuthorized>
        <div className="flex md:flex-row flex-col w-full">
          {/* Video player section */}
          <div className="w-full md:w-8/12">
            {!isLoading && classes.length !== 0 && (
              <div className="video-wrapper">
                <Video
                  videoTitle={videoTitle}
                  videoSrc={videoSrc}
                  onLoaded={handleVideoLoaded} // Handle video loaded event
                />
              </div>
            )}
          </div>

          {/* Class list section */}
          <div className="w-full md:w-4/12">
            {!isLoading && (
              <div className="w-full mt-4">
                {classes?.map((singleClass, index) => (
                  <ClassCard
                    refetch={mutate}
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
          </div>
        </div>
      </IsAuthorized>

      {/* No classes message */}
      {classes?.length === 0 && (
        <div className="h-full absolute top-1/2">
          <p className="text-xl text-zinc-400">No Classes</p>
        </div>
      )}
    </main>
  );
}

// SWR fetcher function for fetching data
const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch the data");
  }
  const data = await res.json();
  console.log(data);

  return data.data;
};
