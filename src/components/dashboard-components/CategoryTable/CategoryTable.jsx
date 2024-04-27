import { Image } from "antd";
import React, { useEffect, useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import TableRow from "./TableRow";

const CategoryTable = ({categories}) => {
  

  console.log(categories);

  return (
    <div className="text-black">
      <table className="table mt-4">
        {/* head */}
        <thead className="text-black">
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Slug</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="overflow-y-scroll h-[40px]">
          {categories?.map((data) => (
           <TableRow key={data.id} data={data} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
