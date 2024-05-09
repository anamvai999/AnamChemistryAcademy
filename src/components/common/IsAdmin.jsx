"use client";

import { authContext } from "@/context/authContext/AuthProvider";
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
  }
};

export default IsAdmin;
