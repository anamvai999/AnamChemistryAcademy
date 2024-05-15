import React, { useState } from 'react'
import Modal from "react-modal";

const ModalComp = ({title, children}) => {
    const [modalIsOpen, setIsOpen] = useState(false);


    // Modal Function
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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
    },
  };


  return (
    <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <h2 className="text-xl  mb-4">Create Chapters</h2>
          {children}
        </Modal>
  )
}

export default ModalComp
