"use client";
import { Button, Image, Input, Upload } from "antd";
import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import zIndex from "@mui/material/styles/zIndex";

const AddClass = ({ refetch, chapterSlug }) => {
  const monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date();

  const currDate = date.getDate();
  const currMonth = date.getMonth();
  const currYear = date.getFullYear();

  const dateString = `${currDate} ${monthName[currMonth]} ${currYear}`;

  console.log(dateString);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [categoryData, setCategoryData] = useState({
    thumbnail: "",
    uploadDate: dateString,
  });

  // image upload
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
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
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload Thumbnail
      </div>
    </button>
  );

  // Getting Input field data
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setCategoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submitting all Data
  const handleSubmit = async () => {
    console.log(categoryData);

    try {
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
        const imageUrl = data.data.url;

        categoryData.thumbnail = imageUrl;

        await fetch(`/api/classes?chapterSlug=${chapterSlug}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(categoryData),
        })
          .then((res) => res.json())
          .then((data) => {
            refetch();
            closeModal();
            if (data.success) {
              toast.success(data.message);
            } else {
              toast.error(data.message);
            }
          });
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log("Error uploading image: ", error);
    }
  };

  // Modal Function
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // Custon Styles for Modal
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
      zIndex: "99",
    },
  };

  return (
    <div className="" >
      <div className="flex justify-center ">
        <button
          title="Create Class"
          onClick={openModal}
          size="large"
          className="flex items-center gap-2 mt-4 border border-white text-xl rounded-full p-2"
        >
          <BiPlus />
        </button>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
        <div className="z-50">
        <h2 className="text-xl  mb-4 text-white text-center">Upload Class</h2>
          <form className="space-y-4 flex flex-col items-center justify-center">
            <div className="">
              {/* Upload Thumbnail */}
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                className="text-white z-50"
              >
                {fileList.length == 1 ? null : uploadButton}
              </Upload>

              {/* Preivew Thumbnail Start */}
              {previewImage && (
                <Image
                  alt="image"
                  wrapperStyle={{
                    display: "none",
                  }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
              {/* Preivew Thumbnail  End */}
            </div>

            <div className="flex flex-col gap-4">
              <input
                className="bg-white px-4 py-2 w-[40vw] rounded-md text-black placeholder:text-zinc-500"
                onChange={handleInputChange}
                name="title"
                placeholder="Enter class title"
              />

              <input
                className="bg-white px-4 py-2 w-[40vw] rounded-md text-black placeholder:text-zinc-500"
                onChange={handleInputChange}
                name="video"
                placeholder="Enter video link"
              />
              <input
                className="bg-white px-4 py-2 w-[40vw] rounded-md text-black placeholder:text-zinc-500"
                onChange={handleInputChange}
                name="material"
                placeholder="Enter material link"
              />
            </div>
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
              Create
            </Button>
          </div>
        </div>
        </Modal>
      </div>
    </div>
  );
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default AddClass;
