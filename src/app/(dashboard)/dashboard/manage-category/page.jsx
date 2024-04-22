"use client";
import { BiBookAdd } from "react-icons/bi";
import React, { useState } from "react";
import { Button, Input, Modal, Space } from "antd";

const Page = () => {
  const [categoryData, setCategoryData] = useState({});
  const [data, setData] = useState(null);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setCategoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const [modal, contextHolder] = Modal.useModal();
  const confirm = () => {
    modal.confirm({
      title: "Add Category",
      icon: <></>,
      content: (
        <>
          <div className="flex my-8 flex-col gap-4 bg-white">
            <Input
              size="large"
              name="title"
              placeholder="Enter Category Title"
              type="text"
              onChange={handleChange}
            />
            <Input
              size="large"
              name="thumbnail"
              placeholder="Enter Category Thumbnail"
              type="text"
              onChange={handleChange}

            />
            <Input
              size="large"
              name="slug"
              placeholder="Enter Category slug"
              type="text"
              onChange={handleChange}

            />
          </div>
        </>
      ),
      okText: "Confirm",
      cancelText: "Cancel",
      onOk() {
        console.log(categoryData)
      },
    });
  };

  return (
    <div>
      <div className="mt-4 flex justify-end">
        <Space>
          {/* <LocalizedModal /> */}
          <Button
            onClick={confirm}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            <BiBookAdd /> Add Category
          </Button>
        </Space>
        {contextHolder}
      </div>
    </div>
  );
};

export default Page;
