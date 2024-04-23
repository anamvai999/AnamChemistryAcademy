"use client";
import { Button, Input } from "antd";
import Modal from "react-modal";
import React, { useState } from "react";
import { BiBookAdd, BiBorderRadius } from "react-icons/bi";

const Page = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [categoryData, setCategoryData] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setCategoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(categoryData);
    fetch("/api/category", {
      method: POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      borderRadius: "20px",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      color: "black",
    },
  };

  return (
    <div>
      <div className="flex justify-end ">
        <Button
          onClick={openModal}
          size="large"
          className="flex items-center gap-2 bg-blue-400 text-white mt-4"
        >
          <BiBookAdd /> Create Category
        </Button>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <h2 className="text-xl  mb-4">Create Category</h2>
          <form className="space-y-4">
            <Input
              onChange={handleChange}
              name="title"
              placeholder="Enter category title"
            />
            <Input
              onChange={handleChange}
              name="thumbnail"
              placeholder="Enter category thumbnail"
            />
            <Input
              onChange={handleChange}
              name="slug"
              placeholder="Enter category slug"
            />
          </form>
          <div className="flex gap-2 justify-end mt-4">
            <Button
              size="large"
              className="bg-red-600 text-white"
              onClick={closeModal}
            >
              Close
            </Button>
            <Button
              size="large"
              className="bg-blue-400 text-white"
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

export default Page;
