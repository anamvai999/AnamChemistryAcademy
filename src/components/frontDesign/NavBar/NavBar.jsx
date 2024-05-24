"use client";
import { IoMdHome } from "react-icons/io";
import { BsCalendar2MinusFill } from "react-icons/bs";
import { PiExamFill } from "react-icons/pi";
import Link from "next/link";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { authContext } from "@/context/authContext/AuthProvider";
import { BiUser } from "react-icons/bi";
import IsAdmin from "@/components/common/IsAdmin";

const NavBar = () => {
    const [hideLogic, setHideLogic] = useState(true);
    const { logOut, currentUser, uid, logInfo } = useContext(authContext);
    useEffect(() => {
        const logic = currentUser ? false : true;
        setHideLogic(() => logic);
    }, [currentUser, logOut]);


    const handleLogOut = () => {
        logOut()
            .then(() => {
                messageApi.open({
                    type: "success",
                    content: "Logout successfully",
                });
                router.push("/login");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            {/* bottom navigation for mobile*/}
            <div className="btm-nav sm:hidden overflow-hidden z-50">

                <Link href={"/"} className="hover:text-blue-500">
                    <IoMdHome />
                    <p>Home</p>
                </Link>

                <Link href={"/exams"} className="hover:text-blue-500">
                    <PiExamFill />
                    <p>Exams</p>
                </Link>
                <Link href={"/routine"} className="hover:text-blue-500">
                    <BsCalendar2MinusFill />
                    <p>Routine</p>
                </Link>
            </div>
            {/* navigation */}
            <div className="p-5 w-full flex justify-around ">
                <div>
                    <p>Logo</p>
                    {/*  <Image
                        alt="logo"
                        src={"https://i.ibb.co/Jd7VzYD/image.png"}
                        width={200}
                        height={200}
                    /> */}
                </div>
                <div className="hidden sm:flex gap-5  ">
                    <Link href={'/'} className="flex items-center space-x-2 hover:text-blue-500">
                        <IoMdHome className="text-xl" />
                        <p>Home</p>
                    </Link>
                    <Link href={"/exams"} className="flex items-center space-x-2 hover:text-blue-500">
                        <PiExamFill className="text-xl" />
                        <p>Exams</p>
                    </Link>
                    <Link href={"/routine"} className="flex items-center space-x-2 hover:text-blue-500">
                        <BsCalendar2MinusFill className="text-xl" />
                        <p>Routine</p>
                    </Link>

                </div>
                <div>
                    {!currentUser && (
                        <Link
                            href="/signUp"
                            className="btn hover:bg-blue-800 md:btn-md btn-sm bg-secondary text-white"
                        >
                            Login
                        </Link>
                    )}

                    {currentUser && (
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full">
                                    <Image
                                        alt="avater"
                                        src={
                                            currentUser.photoURL ? currentUser.photoURL : "/gameravatar.png"
                                        }
                                        width={500}
                                        height={500}
                                    />
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="mt-28 z-[1] p-2 shadow menu menu-sm dropdown-content space-y-3 bg-base-100 rounded-box w-52"
                                >
                                    <IsAdmin>

                                        <li className="text-white"> <Link href="/manage/members"><BiUser /> Members</Link></li>
                                    </IsAdmin>
                                    <button
                                        onClick={handleLogOut}
                                        className="btn  text-white bg-secondary hover:bg-blue-800"
                                    >
                                        Logout
                                    </button>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div >
        </div>
    )
}

export default NavBar;