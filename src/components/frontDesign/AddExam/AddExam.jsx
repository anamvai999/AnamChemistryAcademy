"use client";
import { Button } from "antd";
import Modal from "react-modal";
import React, {  useState } from "react";
import { BiPlus } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddExam = ({ refetch, examSlug }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [exam, setExam] = useState({
    examTitle: "",
    examLink: ""
  });

  // Getting Input field data
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setExam((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submitting all Data
  const handleSubmit = async () => {
    try {
      await fetch(`/api/exam`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exam),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          if (data.success) {
            toast.success(data.message);
            closeModal();
            refetch();
          } else {
            toast.error(data.message);
          }
        });
    } catch (error) {
      toast.error("Something went wrong!");
      console.log("Error while creating Exam: ", error.message);
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
    <div className="">
      <ToastContainer />
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
            <h2 className="text-xl  mb-4 text-white text-center">
              Create Exam
            </h2>
            <form className="space-y-4 flex flex-col items-center justify-center">
              <div className="flex flex-col gap-4">
                <input
                  className="bg-white px-4 py-2 w-[40vw] rounded-md text-black placeholder:text-zinc-500"
                  onChange={handleInputChange}
                  name="examTitle"
                  placeholder="Enter exam title"
                />

                <input
                  className="bg-white px-4 py-2 w-[40vw] rounded-md text-black placeholder:text-zinc-500"
                  onChange={handleInputChange}
                  name="examLink"
                  placeholder="Enter exam link"
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


export default AddExam;
