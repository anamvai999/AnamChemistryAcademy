import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"

const ClassCard = ({ singleClass, classNo, setVideoSrc, currVideoSrc, setVideoTitle }) => {
    const [selectedVideo, setSelectedVideo] = useState(false);

    useEffect(() => {
        if (currVideoSrc === singleClass.video) {
            setSelectedVideo(true);
            setVideoTitle(singleClass.title)
        } else {
            setSelectedVideo(false);
        }
    }, [singleClass, currVideoSrc, setVideoTitle]);

    const handleClick = () => {
        setVideoTitle(singleClass.title);
        setVideoSrc(singleClass.video);
    };

    return (
        <div
            onClick={handleClick}
            className={`flex flex-col my-1 ${selectedVideo ? "border border-white" : ""
                }  gap-3 justify-center items-center `}
        >
            <div className="flex items-center justify-center  bg-base-100 shadow-xl">
                <figure className=" ">
                    <Image
                        className="rounded"
                        src={singleClass.thumbnail}
                        alt={singleClass.title}
                        width={100}
                        height={100}
                    />
                </figure>
                <div className="p-4 ">
                    <h2 className="card-title text-white my-2">{singleClass.title}</h2>
                    <div className="flex justify-between text-zinc-400">
                        <p>class - {classNo}</p>
                        <p className="text-end">{singleClass.uploadDate}</p>
                    </div>
                    <div className="flex gap-1 mt-2">
                        <div className="badge badge-outline text-xs">weapon-series</div>
                        <div className="badge badge-outline text-xs">পরিমাণগত রসায়ন</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;
