import {
  EuiAvatar,
  EuiButton,
  EuiCard,
  EuiFlexGroup,
  EuiFlexItem,
} from '@elastic/eui';
import React from 'react';
import { PLACEHOLDER_IMAGE_PROFILE } from '../constants/image';
import _ from 'lodash';

export default function UserCard({
  user,
  setIsEditUserModalVisible,
  setcurrentUser,
  setIsConfirmationModalVisible,
}) {
  const avatar = () => (
    <EuiAvatar
      className='user-card-image-round'
      imageUrl={_.get(user, 'avatar', PLACEHOLDER_IMAGE_PROFILE)}
      size='xl'
      name='Cat'
    />
  );

  const editUser = () => {
    setcurrentUser(user);
    setIsEditUserModalVisible(true);
  };

  const onUserDelete = () => {
    setcurrentUser(user);
    setIsConfirmationModalVisible(true);
  };

  const footer = () => (
    <EuiFlexGroup justifyContent='flexEnd'>
      <EuiFlexItem>
        <EuiButton onClick={editUser}>Edit</EuiButton>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiButton onClick={onUserDelete}>Delete</EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  );

  return (
    <EuiFlexItem grow={false} style={{ minWidth: 300 }}>
      <EuiCard
        title={user.first_name}
        image={avatar()}
        footer={footer()}
        description={user.email}
      />
    </EuiFlexItem>
  );
}
