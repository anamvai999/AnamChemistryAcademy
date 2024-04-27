import { Image, Input } from "antd";
import React, { useState } from "react";
import { BiEdit, BiSave, BiTrash } from "react-icons/bi";

const TableRow = ({ data }) => {
  const [isEditable, setIsEditable] = useState(false);


  const handleEdit = () => {

  }

  const handleSave = () => {
    
  }

  return (
    <tr key={data.id}>
      <td>
        {" "}
        <Image alt={data.title} width={25} src={data.thumbnail} />
      </td>
      <td>{isEditable ? <Input /> : data.title}</td>
      <td>{data.slug}</td>
      <td>
        <div className="flex gap-4 items-center justify-center">
          <button
            onClick={() => setIsEditable((prev)=> !prev)}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md"
          >
            {isEditable ? (
              <>
                <BiSave /> Save
              </>
            ) : (
              <>
                <BiEdit />
                Edit
              </>
            )}
          </button>
          <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md">
            <BiTrash /> Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
