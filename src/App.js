import React, { useState, useEffect } from 'react';
import './App.css';
import axios from './helper/axios';
import _ from 'lodash';

// Load toast
import ToastMessage from './helper/toastContainer';
import { toast } from 'react-toastify';
import '@elastic/eui/dist/eui_theme_dark.css';
import './assets/styles/images.css';
import UserCard from './components/UserCard';
import {
  EuiButton,
  EuiFlexGrid,
  EuiLoadingSpinner,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageHeader,
} from '@elastic/eui';
import EditUserModal from './components/EditUserModal';
import AddUserModal from './components/AddUserModal';
import { Helmet } from 'react-helmet';
import ConfirmationModal from './components/ConfirmationModal';

function App() {
  /*
  COMPONENTIAL DATA:
  USERS ARRAY
  USERS COUNT
  CURRENT USER
  */

  const [usersToDisplay, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentUser, setcurrentUser] = useState({});

  /*
  MODALS:
  EDIT USER
  ADD USER
  CONFIRMATION MODAL
*/
  const [isEditUserModalVisible, setIsEditUserModalVisible] = useState(false);
  const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(
    false
  );
  /*
  LOADING
  SHOW MORE
  ADDING USER
  */
  const [isShowMoreLoading, setIsShowMoreLoading] = useState(false);
  const [isAddingUser, setisAddingUser] = useState(false);
  const [isDeletingUser, setIsDeletingUser] = useState(false);

  useEffect(() => {
    displayUsers();
  }, []);

  const displayUsers = () => {
    axios
      .get('users')
      .then(({ data }) => {
        setUsers([..._.get(data, 'data', [])]);
      })
      .catch((err) => {
        toast.error('Failed to fetch users');
      });
  };

  const getUsers = () => {
    setIsShowMoreLoading(true);
    axios
      .get('users?page=2')
      .then(({ data }) => {
        setUsers([...usersToDisplay, ..._.get(data, 'data', [])]);
        setTotalUsers(_.get(data, 'total', 0));
        setIsShowMoreLoading(false);
      })
      .catch((err) => {
        setIsShowMoreLoading(false);
        toast.error('Failed to fetch more users');
      });
  };
  const addUser = (payload) => {
    setisAddingUser(true);
    axios
      .post(`users`, payload)
      .then(({ data }) => {
        setUsers([...usersToDisplay, data]);
        toast.success('Success!');
        setisAddingUser(false);
      })
      .catch((err) => {
        setisAddingUser(false);
        toast.error('Failed to fetch more users');
      });
  };

  const updateUser = (id, payload) => {
    axios
      .put(`users/${id}`, payload)
      .then(({ data }) => {
        const newUsersSet = usersToDisplay.filter(
          (user) => data.id !== user.id
        );
        setUsers([...newUsersSet, data]);
        toast.success('Success!');
      })
      .catch((err) => {
        toast.error('Failed to fetch more users');
      });
  };
  const deleteUser = (id) => {
    setIsDeletingUser(true);
    axios
      .delete(`users/${id}`)
      .then((data) => {
        const newUsersSet = usersToDisplay.filter((user) => id !== user.id);
        setUsers([...newUsersSet]);
        toast.success('Success!');
        setIsDeletingUser(false);
      })
      .catch((err) => {
        setIsDeletingUser(false);
        toast.error('Failed to fetch more users');
      });
  };

  const showMoreUsersButton = () => (
    <EuiButton onClick={getUsers} isLoading={isShowMoreLoading}>
      Show More
    </EuiButton>
  );

  const showLessUsersButton = () => (
    <EuiButton onClick={displayUsers}>Show Less</EuiButton>
  );

  const showAddUserModal = () => setIsAddUserModalVisible(true);

  const allUsersLoaded = () => usersToDisplay.length === totalUsers;
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Great People</title>
        <link rel='icon' type='image/png' href='favicon.ico' sizes='16x16' />
      </Helmet>
      <EuiPage>
        <EuiPageBody>
          <EuiPageHeader>
            <h1>Great People</h1>
            {isDeletingUser && <EuiLoadingSpinner size='m' />}
            <EuiButton onClick={showAddUserModal} isLoading={isAddingUser}>
              Add User
            </EuiButton>
          </EuiPageHeader>
          <EuiPageContent>
            <EuiFlexGrid>
              {usersToDisplay.map((user) => (
                <UserCard
                  user={user}
                  setIsEditUserModalVisible={setIsEditUserModalVisible}
                  key={user.id}
                  setcurrentUser={setcurrentUser}
                  deleteUser={deleteUser}
                  setIsConfirmationModalVisible={setIsConfirmationModalVisible}
                />
              ))}
            </EuiFlexGrid>
          </EuiPageContent>
          {!allUsersLoaded() ? showMoreUsersButton() : showLessUsersButton()}
        </EuiPageBody>
      </EuiPage>

      {/* EDIT USER MODAL */}
      <EditUserModal
        isEditUserModalVisible={isEditUserModalVisible}
        setIsEditUserModalVisible={setIsEditUserModalVisible}
        user={currentUser}
        updateUser={updateUser}
      />
      {/* ADD USER MODAL */}
      <AddUserModal
        isAddUserModalVisible={isAddUserModalVisible}
        setIsAddUserModalVisible={setIsAddUserModalVisible}
        addUser={addUser}
      />
      {/* CONFIRMATION MODAL */}
      <ConfirmationModal
        isConfirmationModalVisible={isConfirmationModalVisible}
        setIsConfirmationModalVisible={setIsConfirmationModalVisible}
        user={currentUser}
        deleteUser={deleteUser}
      />
      {/* TOAST MESSAGE */}
      <ToastMessage />
    </React.Fragment>
  );
}

export default App;
