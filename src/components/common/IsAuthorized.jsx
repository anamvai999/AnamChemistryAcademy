"use client";

import { authContext } from "@/context/authContext/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const IsAuthorized = ({ children }) => {
  const { logInfo, isLogInfoLoading, currentUser, userEmail } =
    useContext(authContext);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  console.log(userEmail);

  useEffect(() => {
    try {
      if (userEmail !== null) {
        fetch(`/api/isStudent?studentEmail=${userEmail}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data?.data?.email === userEmail) {
              setIsStudent(true);
            } else {
              setIsStudent(false);
            }
          });
      }
    } catch (err) {
      console.log(err);
    }

    setIsClient(true);
  }, [userEmail]);

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
