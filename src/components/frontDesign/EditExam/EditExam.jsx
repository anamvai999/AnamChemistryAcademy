import React from 'react'
import { BiTrash } from 'react-icons/bi';
import { toast } from 'react-toastify';
import Swal from "sweetalert2";

const EditExam = ({refetch, data }) => {
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
                    fetch(`/api/exam?id=${data._id}`, {
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
                    console.error("Error uploading image: ", error);
                }
            }
        });
    };

    return (
        <div>
            <button
                onClick={handleDeleteItem}
                className="flex items-center justify-center gap-2 bg-red-600 text-white px-3 py-2 rounded-md"
            >
                <BiTrash />
                Delete
            </button>
        </div>
    )
}

export default EditExam;