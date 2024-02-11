import { useState } from "react";

export const useModal = () => {
  const [descModal, setDescModal] = useState(false);
  const [modalDesc, setModalDesc] = useState("");

  const showModal = (desc: string) => {
    console.log(desc)
    setDescModal(true);
    setModalDesc(desc);
  };

  const handleOkForDesc = () => {
    setDescModal(false);
  };

  const handleCancelForDesc = () => {
    setDescModal(false);
  };

  return { showModal, handleOkForDesc, handleCancelForDesc, descModal, modalDesc };
};
