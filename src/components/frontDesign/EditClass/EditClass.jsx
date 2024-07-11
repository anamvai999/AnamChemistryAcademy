"use client";
import { Button, Image, Input, Upload } from "antd";
import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import IsAdmin from "@/components/common/IsAdmin";
import Swal from "sweetalert2";

const EditClass = ({ refetch, data }) => {
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
  const [classes, setClasses] = useState(data);

  console.log(classes);

  // image upload
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (classes.thumbnail) {
      setPreviewImage(classes.thumbnail);
      setFileList([{ url: classes.thumbnail }]);
    }
  }, [classes]);

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

    setClasses((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submitting all Data
  const handleSubmit = async () => {
    try {
      let imageUrl = classes.thumbnail;

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

      const updatedClass = { ...classes, thumbnail: imageUrl };

      const result = await fetch(`/api/classes?id=${classes._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedClass),
      });

      const resultData = await result.json();

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

  const handleDeleteItem = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          fetch(`/api/classes?id=${classes._id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((resultData) => {
              if (resultData.success) {
                refetch();
                toast.success(resultData.message);
              } else {
                toast.error(resultData.message);
              }
            });
        } catch (error) {
          toast.error("Something went wrong!");
        }
      }
    });
  };

  return (
    <div className="pb-4">
      <div className="flex justify-center ">
        <IsAdmin>
          <div className="flex gap-4 justify-center items-center">
            <button
              onClick={openModal}
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-3 py-2 rounded-md"
            >
              <BiEdit />
              Edit
            </button>
            <button
              onClick={handleDeleteItem}
              className="flex items-center justify-center gap-2 bg-red-600 text-white px-3 py-2 rounded-md"
            >
              <BiTrash />
              Delete
            </button>
          </div>
        </IsAdmin>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <div className="z-50">
            <h2 className="text-xl  mb-4 text-white text-center">
              Update Class
            </h2>
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
                  defaultValue={classes.title}
                />

                <input
                  className="bg-white px-4 py-2 w-[40vw] rounded-md text-black placeholder:text-zinc-500"
                  onChange={handleInputChange}
                  name="video"
                  placeholder="Enter video link"
                  defaultValue={classes.video}
                />
                <input
                  className="bg-white px-4 py-2 w-[40vw] rounded-md text-black placeholder:text-zinc-500"
                  onChange={handleInputChange}
                  name="lectureSheet"
                  defaultValue={classes.lectureSheet}
                  placeholder="Enter lecture sheet"
                />
                <input
                  className="bg-white px-4 py-2 w-[40vw] rounded-md text-black placeholder:text-zinc-500"
                  onChange={handleInputChange}
                  name="practiceSheet"
                  defaultValue={classes.practiceSheet}
                  placeholder="Enter practice sheet"
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
                Update
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

export default EditClass;
