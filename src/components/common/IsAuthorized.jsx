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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkStudentStatus = async () => {
      if (userEmail) {
        try {
          const response = await fetch(`/api/is-student?studentEmail=${userEmail}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          if (data?.data?.email === userEmail) {
            setIsStudent(true);
          } else {
            setIsStudent(false);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    checkStudentStatus();
    setIsClient(true);
  }, [userEmail]);

  useEffect(() => {
    if (logInfo && (logInfo.role === "admin" || isStudent)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [logInfo, isStudent]);

  if (!isClient) {
    return null;
  }

  if (isLogInfoLoading) {
    return <></>;
  }

  if (currentUser && isAuthenticated) {
    return children;
  } else {
    return <>Buy course first</>;
  }
};

export default IsAuthorized;
