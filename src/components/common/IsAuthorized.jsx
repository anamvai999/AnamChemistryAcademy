"use client";

import { authContext } from "@/context/authContext/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const IsAuthorized = ({ children }) => {
  const { logInfo, isLogInfoLoading, currentUser } = useContext(authContext);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    try {
      fetch(`/api/isStudent?studentEmail=${currentUser?.email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsStudent(data.success);
        });
    } catch (err) {
      console.log(err);
    }

    setIsClient(true);
  }, [currentUser]);

  console.log(isStudent);

  if (!isClient) {
    return null;
  }

  if (
    currentUser &&
    !isLogInfoLoading &&
    logInfo != null &&
    logInfo != undefined &&
    (logInfo.role === "admin" || isStudent)
  ) {
    return children;
  } else {
    return <>Buy course first</>;
  }
};

export default IsAuthorized;
