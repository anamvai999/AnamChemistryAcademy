"use client";
import { IoMdHome } from "react-icons/io";
import { BsCalendar2MinusFill } from "react-icons/bs";
import { PiExamFill } from "react-icons/pi";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { authContext } from "@/context/authContext/AuthProvider";
import { BiEdit, BiUser } from "react-icons/bi";
import IsAdmin from "@/components/common/IsAdmin";
import { Button, Image, Upload } from "antd";
import { PlusOneOutlined } from "@mui/icons-material";
import Modal from "react-modal";
import useSWR from "swr";
import { toast } from "react-toastify";

const NavBar = () => {
  const {
    data: logo,
    error,
    isLoading,
    mutate: refetch,
  } = useSWR(`/api/logo`, fetcher);

  const [hideLogic, setHideLogic] = useState(true);
  const { logOut, currentUser, uid, logInfo } = useContext(authContext);
  useEffect(() => {
    if (logo) {
      setPreviewImage(logo);
      setFileList([{ url: logo }]);
    }

    const logic = currentUser ? false : true;
    setHideLogic(() => logic);
  }, [currentUser, logOut, logo]);

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

  // Image code
  const [modalIsOpen, setIsOpen] = useState(false);

  // image upload
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(logo);
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // Upload button
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOneOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  // Submitting all Data
  const handleSubmit = async () => {
    try {
      let imageUrl = logo;

      if (fileList.length > 0 && fileList[0].originFileObj) {
        const imgData = new FormData();
        imgData.append("image", fileList[0].originFileObj);

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
          {
            method: "POST",
            body: imgData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          imageUrl = data.data.url;
        } else {
          throw new Error("Image upload failed");
        }
      }

      const result = await fetch(`/api/logo`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ logo: imageUrl }),
      });

      const resultData = await result.json();

      console.log(resultData);

      refetch();
      closeModal();

      if (resultData.success) {
        toast.success(resultData.message);
      } else {
        toast.error(resultData.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error uploading image: ", error);
    }
  };

  // Modal Function
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // Custom Styles for Modal
  const customStyles = {
    content: {
      backgroundColor: "black",
      top: "50%",
      left: "50%",
      right: "auto",
      borderRadius: "20px",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      color: "white",
    },
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2 className="text-xl mb-4">Update Logo</h2>
        <form className="space-y-4">
          {/* Upload Thumbnail */}
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            className="text-white"
          >
            {fileList.length === 1 ? null : uploadButton}
          </Upload>

          {/* Preview Thumbnail Start */}
          {previewImage && (
            <Image
              alt="image"
              wrapperStyle={{
                display: "none",
              }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
              }}
              src={previewImage}
            />
          )}
          {/* Preview Thumbnail End */}
        </form>
        <div className="flex gap-2 justify-end mt-4">
          <Button
            size="large"
            className="bg-red-600 text-white border-none"
            onClick={closeModal}
          >
            Close
          </Button>
          <Button
            size="large"
            className="bg-green-400 text-white border-none"
            onClick={handleSubmit}
          >
            Update
          </Button>
        </div>
      </Modal>
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
      <div className="p-5 w-full items-center flex justify-around ">
        <div className="flex items-center text-white  gap-4">
          <Image width={200} alt="logo" preview={false} src={logo} />
          <IsAdmin>
            <div onClick={openModal} className="cursor-pointer">
              <BiEdit />
            </div>
          </IsAdmin>
        </div>
        <div className="hidden sm:flex gap-5  ">
          <Link
            href={"/"}
            className="flex items-center space-x-2 hover:text-blue-500"
          >
            <IoMdHome className="text-xl" />
            <p>Home</p>
          </Link>
          <Link
            href={"/exams"}
            className="flex items-center space-x-2 hover:text-blue-500"
          >
            <PiExamFill className="text-xl" />
            <p>Exams</p>
          </Link>
          <Link
            href={"/routine"}
            className="flex items-center space-x-2 hover:text-blue-500"
          >
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
                      currentUser.photoURL
                        ? currentUser.photoURL
                        : "/gameravatar.png"
                    }
                    preview={false}
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="mt-28 z-[1] p-2 shadow menu menu-sm dropdown-content space-y-3 bg-base-100 rounded-box w-52"
                >
                  <IsAdmin>
                    <li className="text-white">
                      {" "}
                      <Link href="/manage/members">
                        <BiUser /> Members
                      </Link>
                    </li>
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
      </div>
    </div>
  );
};

export default NavBar;

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch the data");
  }
  const data = await res.json();
  console.log(data);

  return data.data[0].logo;
};
