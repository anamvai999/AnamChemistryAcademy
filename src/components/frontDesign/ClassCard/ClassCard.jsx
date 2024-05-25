import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import EditClass from "../EditClass/EditClass";

const ClassCard = ({
  singleClass,
  classNo,
  setVideoSrc,
  currVideoSrc,
  setVideoTitle,
  refetch,
}) => {
  const [selectedVideo, setSelectedVideo] = useState(false);

  useEffect(() => {
    if (currVideoSrc === singleClass.video) {
      setSelectedVideo(true);
      setVideoTitle(singleClass.title);
    } else {
      setSelectedVideo(false);
    }
  }, [singleClass, currVideoSrc, setVideoTitle]);

  const handleClick = () => {
    setVideoTitle(singleClass.title);
    setVideoSrc(singleClass.video);
  };

  console.log(singleClass);

  return (
    <>
      <div
        className={`flex flex-col my-1 ${
          selectedVideo ? "border border-white" : ""
        }  gap-3 justify-center items-center `}
      >
        <div
          onClick={handleClick}
          className="flex px-2 justify-between gap-2 cursor-pointer items-center w-full bg-base-100 shadow-xl"
        >
          <div className="w-3/12">
            <figure>
              <Image
                className="rounded"
                src={singleClass.thumbnail}
                alt={singleClass.title}
                width={100}
                height={100}
              />
            </figure>
          </div>
          <div className="py-4  w-9/12">
            <h2 className="card-title text-white my-2">{singleClass.title}</h2>
            <div className="flex justify-between text-zinc-400">
              <p>class - {classNo}</p>
              <p className="text-end">{singleClass.uploadDate}</p>
            </div>
            <div className="flex gap-1 mt-2">
              {(singleClass?.lectureSheet !== undefined ||
                singleClass?.lectureSheet !== null) && (
                <Link
                  href={
                    singleClass?.lectureSheet !== undefined &&
                    singleClass.lectureSheet
                  }
                  className="badge badge-outline text-xs"
                >
                  Lecture Sheet
                </Link>
              )}
              {(singleClass?.practiceSheet !== undefined ||
                singleClass?.practiceSheet !== null) && (
                <Link
                  href={
                    singleClass?.practiceSheet !== undefined &&
                    singleClass.practiceSheet
                  }
                  className="badge badge-outline text-xs"
                >
                  Practice Sheet
                </Link>
              )}
            </div>
          </div>
        </div>

        <EditClass data={singleClass} refetch={refetch} />
      </div>
    </>
  );
};

export default ClassCard;
