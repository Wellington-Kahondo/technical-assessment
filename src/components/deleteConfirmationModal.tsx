import React from 'react';
import { Modal } from 'antd';

interface DeleteConfirmationModalProps {
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isVisible, onOk, onCancel }) => {
  return (
    <Modal
      title="Confirm Deletion"
      open={isVisible}
      onOk={onOk}
      onCancel={onCancel}
      okText="Yes"
      cancelText="No"
    >
      <p>Are you sure you want to delete?</p>
    </Modal>
  );
};

export default DeleteConfirmationModal;
