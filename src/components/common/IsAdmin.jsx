"use client";

import { authContext } from "@/context/authContext/AuthProvider";
import Link from "next/link";
import { useContext, useState } from "react";
import useSWR from "swr";

const IsAdmin = ({ children }) => {
  const { logInfo, isLogInfoLoading, currentUser } = useContext(authContext);
  console.log(logInfo);

  if (
    currentUser &&
    !isLogInfoLoading &&
    logInfo != null &&
    logInfo != undefined &&
    logInfo.role === "admin"
  ) {
    return children;
  } else {
    return <></>;
    // return <div className="absolute left-1/2 space-y-3 -translate-x-1/2 top-1/2 justify-center items-center">
    //   <p className="text-5xl text-center">😥</p>
    //   <p className="text-3xl text-red-500">You are not authorized to access this </p>
    //   <Link href="/" className="text-center btn">Go Back</Link>
    // </div>;
  }
};

export default IsAdmin;
