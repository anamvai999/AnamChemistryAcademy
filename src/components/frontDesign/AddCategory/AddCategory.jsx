"use client";
import { Button, Image, Input, Upload } from "antd";
import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const AddCategory = ({ refetch }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [categoryData, setCategoryData] = useState({ thumbnail: "" });

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
        Upload
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

        await fetch("/api/category", {
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
      toast.error("Something went wrong!!");
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
    },
  };

  return (
    <div className="mb-6">
      <div className="flex justify-center ">
        <button
          title="Create Category"
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
          <h2 className="text-xl  mb-4">Create Category</h2>
          <form className="space-y-4">
            {/* Upload Thumbnail */}
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              className="text-white"
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
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
            {/* Preivew Thumbnail  End */}

            <Input
              className=""
              onChange={handleInputChange}
              name="title"
              placeholder="Enter category title"
            />
            <Input
              onChange={handleInputChange}
              name="slug"
              placeholder="Enter category slug"
            />
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

export default AddCategory;
