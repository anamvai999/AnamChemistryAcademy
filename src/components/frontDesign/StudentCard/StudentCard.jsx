import React from "react";
import { BiTrash } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

const StudentCard = ({ data, index, refetch }) => {
  const handleDelete = () => {
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
          fetch(`/api/student?email=${data.email}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "applicaion/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
               Swal.fire({
                   icon: "success",
                   title: `${data.message}`
               }

               )
                refetch();
              } else {
                Swal.fire({
                    icon: "error",
                    title: `${data.message}`
                })
              }
            });
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <>
      {" "}
      <tr>
        <td>{index}</td>
        <td>{data?.email}</td>
        <td>
          <button
            onClick={handleDelete}
            className="flex items-center justify-center gap-2 rounded px-2 py-3 bg-red-500 text-white"
          >
            <BiTrash /> Remove
          </button>
        </td>
      </tr>
    </>
  );
};

export default StudentCard;
