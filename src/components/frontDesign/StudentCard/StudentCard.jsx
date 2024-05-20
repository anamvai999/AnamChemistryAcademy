import React, { useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

const StudentCard = ({ data, index, refetch }) => {
  const [role, setRole] = useState(data.role);

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
          fetch(`/api/user?email=${data.email}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "applicaion/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.data.deletedCount > 0) {
                Swal.fire({
                  icon: "success",
                  title: `User is deleted`,
                });
                refetch();
              } else {
                Swal.fire({
                  icon: "error",
                  title: `${data.message}`,
                });
              }
            });
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const handleRoleChange = (e) => {
    e.preventDefault();

    const selectedValue = e.target.value;

    if (role !== selectedValue) {
      Swal.fire({
        title: `Change ${data.role} to ${selectedValue}?`,
        text: `You are about to change ${data.userName} role`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Change",
      }).then((result) => {
        if (result.isConfirmed) {
          setRole(selectedValue);
          try {
            fetch(`/api/user?email=${data.email}&role=${selectedValue}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "applicaion/json",
              },
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                if (data.data.acknowledged) {
                  Swal.fire({
                    icon: "success",
                    title: `User role has been changed`,
                  });
                  refetch();
                } else {
                  Swal.fire({
                    icon: "error",
                    title: `${data.message}`,
                  });
                }
              });
          } catch (err) {
            console.log(err);
          }
        }
      });
    }else{
      setRole(data.role);
    }
  };

  return (
    <>
      {" "}
      <tr>
        <td>{index}</td>
        <td>{data?.userName}</td>
        <td>{data?.email}</td>
        <td>
          <select
            defaultValue={data.role}
            value={role}
            className="px-2 py-3 rounded "
            onChange={handleRoleChange}
          >
            <option name="role" value="user" id="">
              User
            </option>
            <option name="role" value="student" id="">
              Student
            </option>
            <option name="role" value="admin" id="">
              Admin
            </option>
          </select>
        </td>
        <td className="flex gap-2 justify-center items-center">
          {/* <button
            onClick={}
            className="flex items-center justify-center gap-2 rounded px-2 py-3 bg-green-500 text-white"
          >
            <BiEdit /> Edit
          </button> */}
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
