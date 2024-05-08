"use client";
import { authContext } from "@/context/authContext/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Alert, Button, Space, message } from "antd";
import { useRouter } from "next/navigation";
import { updateProfile } from "firebase/auth";
import auth from "../../../../firebase.config";

const Page = () => {
  const { googleSignIn, emailSignUp, updateUser } = useContext(authContext);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const handleSignUp = async (form) => {
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");

    emailSignUp(email, password)
      .then((res) => {
        if (res.user) {
          updateProfile(auth.currentUser, { displayName: name })
            .then(() => {
              fetch("/api/user", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: res.user.email,
                  userName: res.user.displayName,
                  role: "user",
                  userId: res.user.uid,
                }),
              }).then(() => {
                messageApi.open({
                  type: "success",
                  content: "Logged in successfully",
                });
              });
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  const handleGoogleSignIn = () => {
    return googleSignIn()
      .then((res) => {
        if (res.user) {
          messageApi.open({
            type: "success",
            content: "Logged in successfully",
          });

          fetch("/api/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: res.user.email,
              userName: res.user.displayName,
              role: "user",
              userId: res.user.uid,
            }),
          });
        }
        router.push("/");
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: "Something went wrong",
        });
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="border-white border w-1/2 p-10 rounded-md">
        {contextHolder}
        <div className="flex flex-col justify-center gap-8 ">
          <div className="text-5xl text-center">Logo</div>
          <h3 className="text-3xl text-center">Welcome back to Akhankha</h3>

          <div className="relative md:w-1/2 w-full my-10 mx-auto">
            <button
              onClick={() => handleGoogleSignIn()}
              className="flex hover:bg-orange-500 hover:text-white  w-full sm:w-2/3 mx-auto justify-center items-center gap-2 border-2"
            >
              <div className=" text-3xl my-2">
                <FcGoogle />
              </div>
              <p>Sign In With Google</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
