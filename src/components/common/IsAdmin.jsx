"use client";

import { authContext } from "@/context/authContext/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const IsAdmin = ({ children }) => {
  const { logInfo, isLogInfoLoading, currentUser } = useContext(authContext);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      if (
        currentUser &&
        !isLogInfoLoading &&
        (logInfo == null || logInfo == undefined || logInfo.role !== "admin")
      ) {
        router.push("/");
      }
    }
  }, [currentUser, isLogInfoLoading, logInfo, router, isClient]);

  if (!isClient) {
    return null;
  }

  if (
    currentUser &&
    !isLogInfoLoading &&
    logInfo != null &&
    logInfo != undefined &&
    logInfo.role === "admin"
  ) {
    return children;
  } else {
    return null;
  }
};

export default IsAdmin;
