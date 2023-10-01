"use client";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";

const RentModal = () => {
  const rentModal = useRentModal();

  return (
    <Modal
    title="Homebnb your home"
    actionLabel="Submit"
    isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
    />
  );
};

export default RentModal;
