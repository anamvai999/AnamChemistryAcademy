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
  const [studentEmail, setStudentEmail] = useState('');
  useEffect(() => {
    const checkStudentStatus = async () => {
      if (userEmail) {
        try {
          const response = await fetch(`/api/isStudent?studentEmail=${userEmail}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          setStudentEmail(data?.data?.email)
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
console.log(logInfo.email);
  console.log(studentEmail);
  useEffect(() => {
    if (logInfo && (logInfo.role === "admin" || logInfo.email === studentEmail)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [logInfo, isStudent]);

  if (!isClient) {
    return null;
  }

  if (isLogInfoLoading) {
    return <>Loading...</>;
  }

  if (currentUser && isAuthenticated) {
    return children;
  } else {
    return <>Buy course first</>;
  }
};

export default IsAuthorized;
