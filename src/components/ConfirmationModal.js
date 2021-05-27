import React from 'react';
import { EuiConfirmModal } from '@elastic/eui';

export default function ConfirmationModal({
  isConfirmationModalVisible,
  setIsConfirmationModalVisible,
  user,
  deleteUser,
}) {
  const closeModal = () => setIsConfirmationModalVisible(false);

  const onSubmit = () => {
    deleteUser(user.id);
    closeModal();
  };

  return (
    <div>
      {isConfirmationModalVisible && (
        <EuiConfirmModal
          title='Delete'
          onCancel={closeModal}
          onConfirm={onSubmit}
          cancelButtonText='Cancel'
          confirmButtonText='Delete'
          buttonColor='ghost'
          defaultFocusedButton='cancel'
        >
          <p>Selected user will be deleted.</p>
          <p>Do you wish to proceed?</p>
        </EuiConfirmModal>
      )}
    </div>
  );
}
