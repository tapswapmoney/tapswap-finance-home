import React, { useState } from 'react';
import _ from 'lodash';
import { useFormik } from 'formik';
import {
  EuiButton,
  EuiButtonEmpty,
  EuiFieldText,
  EuiFlexGroup,
  EuiForm,
  EuiFormRow,
  EuiImage,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiFilePicker,
  EuiText,
  EuiSpacer,
  EuiFlexItem,
} from '@elastic/eui';
import { nanoid } from 'nanoid';

export default function AddUserModal({
  isAddUserModalVisible,
  setIsAddUserModalVisible,
  addUser,
}) {
  const [files, setFiles] = useState({});

  const closeModal = () => {
    setIsAddUserModalVisible(false);
  };

  const onSubmit = (data) => {
    addUser({ ...data, id: nanoid() });
    setFiles({});
    closeModal();
  };

  const { handleSubmit, setFieldValue, values } = useFormik({
    initialValues: {
      avatar: '',
      id: '',
      email: '',
      first_name: '',
      last_name: '',
      name: '',
      job: '',
    },
    onSubmit: (data) => onSubmit(data),
  });

  const { avatar, email, first_name, last_name, name, job } = values;
  const onChange = (files) => {
    setFiles(files);
    setFieldValue('avatar', URL.createObjectURL(_.get(files, '[0]', {})));
  };

  const renderFiles = () => {
    if (files.length > 0) {
      return (
        <>
          <EuiText>Your Avatar</EuiText>
          <EuiImage
            url={avatar}
            key={avatar}
            style={{
              maxHeight: 200,
              marginBottom: 20,
            }}
          />
        </>
      );
    } else {
      return (
        <>
          <p>Choose your Avatar</p>
          <EuiSpacer />
          <EuiFilePicker
            multiple
            initialPromptText='Select or drag and drop multiple files'
            onChange={(files) => {
              onChange(files);
            }}
          />
          <EuiSpacer />
        </>
      );
    }
  };

  const fileUploadForm = () => <>{renderFiles()}</>;

  const UserForm = (
    <EuiForm
      style={{
        marginTop: 20,
      }}
    >
      {fileUploadForm()}
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

  if (isAddUserModalVisible) {
    modal = (
      <EuiOverlayMask>
        <EuiModal onClose={closeModal} initialFocus='[name=popswitch]'>
          <EuiModalHeader>
            <EuiModalHeaderTitle>Update User</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiFlexGroup alignItems='center'>
              <EuiFlexItem>{UserForm}</EuiFlexItem>
            </EuiFlexGroup>
          </EuiModalBody>
          <EuiModalFooter>
            <EuiButtonEmpty onClick={closeModal}>Cancel</EuiButtonEmpty>
            <EuiButton onClick={handleSubmit} fill>
              Add
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      </EuiOverlayMask>
    );
  }
  return <div>{modal}</div>;
}
