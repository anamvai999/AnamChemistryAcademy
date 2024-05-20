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

  if (!isClient) {
    return null;
  }

  if (
    currentUser &&
    !isLogInfoLoading &&
    logInfo != null &&
    logInfo != undefined &&
    (logInfo.role === "admin" || logInfo.role === "student")
  ) {
    return children;
  } else {
    return <div className="absolute top-1/2  ">
      <p className="text-3xl text-zinc-500">
        Oops! No Course For you
      </p>
    </div>;
  }
};

export default IsAdmin;
