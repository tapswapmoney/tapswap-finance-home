import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useFormik } from 'formik';
import {
  EuiButton,
  EuiButtonEmpty,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiImage,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
} from '@elastic/eui';

export default function EditUserModal({
  isEditUserModalVisible,
  setIsEditUserModalVisible,
  user,
  updateUser,
}) {
  const closeModal = () => setIsEditUserModalVisible(false);

  const onSubmit = (data) => {
    updateUser(user.id, data);
    closeModal();
  };

  const { handleSubmit, setFieldValue, values } = useFormik({
    initialValues: {
      id: '',
      email: '',
      first_name: '',
      last_name: '',
      name: '',
      job: '',
    },
    onSubmit: (data) => onSubmit(data),
  });

  useEffect(() => {
    setFieldValue('avatar', _.get(user, 'avatar', ''), '');
    setFieldValue('id', _.get(user, 'id', ''));
    setFieldValue('email', _.get(user, 'email', ''));
    setFieldValue('first_name', _.get(user, 'first_name', ''));
    setFieldValue('last_name', _.get(user, 'last_name', ''));
    setFieldValue('name', _.get(user, 'name', ''));
    setFieldValue('job', _.get(user, 'job', ''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const { avatar, email, first_name, last_name, name, job } = values;

  const UserForm = (
    <EuiForm
      style={{
        marginTop: 20,
      }}
    >
      <EuiFormRow label='Email'>
        <EuiFieldText
          value={email}
          name='email'
          onChange={(e) => setFieldValue('email', e.target.value)}
        />
      </EuiFormRow>
      <EuiFormRow label='First Name'>
        <EuiFieldText
          value={first_name}
          onChange={(e) => setFieldValue('first_name', e.target.value)}
        />
      </EuiFormRow>
      <EuiFormRow label='Last name'>
        <EuiFieldText
          value={last_name}
          onChange={(e) => setFieldValue('last_name', e.target.value)}
        />
      </EuiFormRow>
      <EuiFormRow label='Name'>
        <EuiFieldText
          value={name}
          onChange={(e) => setFieldValue('name', e.target.value)}
        />
      </EuiFormRow>
      <EuiFormRow label='Job'>
        <EuiFieldText
          value={job}
          onChange={(e) => setFieldValue('job', e.target.value)}
        />
      </EuiFormRow>
    </EuiForm>
  );

  let modal;

  if (isEditUserModalVisible) {
    modal = (
      <EuiOverlayMask>
        <EuiModal onClose={closeModal} initialFocus='[name=popswitch]'>
          <EuiModalHeader>
            <EuiModalHeaderTitle>Update User</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiFlexGroup alignItems='center'>
              <EuiFlexItem>
                <EuiImage url={avatar} size='large' hasShadow allowFullScreen />
              </EuiFlexItem>
            </EuiFlexGroup>
            {UserForm}
          </EuiModalBody>
          <EuiModalFooter>
            <EuiButtonEmpty onClick={closeModal}>Cancel</EuiButtonEmpty>
            <EuiButton onClick={handleSubmit} fill>
              Save
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      </EuiOverlayMask>
    );
  }
  return <div>{modal}</div>;
}
