"use client";
import { Button,  Input } from "antd";
import Modal from "react-modal";
import React, {  useState } from "react";
import { BiPlus } from "react-icons/bi";
import { toast } from "react-toastify";

const AddStudent = ({ refetch }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const [student, setStudent] = useState();

  // Getting Input field data
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submitting all Data
  const handleSubmit = async () => {
    console.log(student);

    try {
      await fetch("/api/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success(data.message);
            refetch();
          }else{
            toast.error(data.message);
          }
          closeModal();
        })
        .catch((err) => {
          toast.error("Something went wrong!");
          console.log("Error adding student: ", err);
        });
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
      width: "30%",
    },
  };

  return (
    <div>
      <div className="flex justify-center ">
        <button
          title="Add Student"
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
          <h2 className="text-xl  mb-4">Add Student</h2>
          <form className="space-y-4 ">
            <Input
              onChange={handleInputChange}
              name="email"
              placeholder="Enter student email"
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

export default AddStudent;
