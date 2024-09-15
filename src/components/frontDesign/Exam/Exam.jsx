import IsAdmin from "@/components/common/IsAdmin";
import isoTimeFormatter from "@/utils/isoTimeFormatter";
import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";

const Exam = ({ _id, examTitle, examLink, createdAt }) => {
  const formattedDate = isoTimeFormatter(createdAt);
  return (
    <div className="flex gap-4 items-center justify-between w-full">
      <h2>{examTitle}</h2>
      <div className="flex gap-4 items-center">
        <p>{formattedDate}</p>     
      </div>
    </div>
  );
};

export default Exam;
