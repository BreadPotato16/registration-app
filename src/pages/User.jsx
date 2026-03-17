import React, { useState, useEffect, useRef } from 'react';
import axiosClient from '../../services/axiosClient';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';

DataTable.use(DT);

const MySwal = withReactContent(Swal);

function User() {

  const [userData, setUserData] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const navigate = useNavigate();
  const userDataRef = useRef([]);

  const fetchUserData = async () => {
    try {
      const response = await axiosClient.get("retrieve.php");
      if (response.data.status === 'success') {
        setUserData(response.data.data);
        userDataRef.current = response.data.data;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  const handleDelete = async (id) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) return;

    try {
      const response = await axiosClient.delete('delete.php', { data: { id } });
      if (response.data.status === 'success') {
        await fetchUserData();
        MySwal.fire({
          title: 'Deleted!',
          text: response.data.message,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      MySwal.fire({
        title: 'Error',
        text: 'Failed to delete user.',
        icon: 'error',
      });
    }
  }

  const handleEdit = (user) => {
    setEditUser({ ...user });
  }

  const handleUpdate = async (userToUpdate) => {
    try {
      const response = await axiosClient.put('update.php', userToUpdate);
      if (response.data.status === 'success') {
        setEditUser(null);
        await fetchUserData();
        MySwal.fire({
          title: 'Updated!',
          text: response.data.message,
          icon: 'success',
        });
      } else {
        MySwal.fire({
          title: 'Something Went Wrong!',
          text: response.data.message,
          icon: 'warning',
        });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      MySwal.fire({
        title: 'Error',
        text: 'Failed to update user.',
        icon: 'error',
      });
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  const columns = [
    { title: 'ID', data: 'id' },
    { title: 'Username', data: 'username' },
    { title: 'Password', data: 'password' },
    {
      title: 'Actions',
      data: null,
      orderable: false,
      searchable: false,
      render: (data) => `
        <button class="btn btn-danger btn-sm me-1" data-action="delete" data-id="${data.id}">Delete</button>
        <button class="btn btn-warning btn-sm" data-action="edit" data-id="${data.id}">Edit</button>
      `
    }
  ];

  return (
    <>
      <div className='container-fluid px-4 mt-5'>

        {/* Edit Modal */}
        {editUser && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit User</h5>
                  <button className="btn-close" onClick={() => setEditUser(null)}></button>
                </div>
                <div className="modal-body">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      value={editUser.username}
                      onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                    />
                    <label>Username</label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setEditUser(null)}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => handleUpdate(editUser)}>Save Changes</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="row justify-content-center">
          <div className="col-10">

            <div className="d-flex justify-content-end mb-3">
              <button className="btn btn-success btn-sm" onClick={() => navigate('/register')}>
                <i className="bi bi-plus-lg me-1"></i> Add User
              </button>
            </div>

            <div onClick={(e) => {
              const btn = e.target.closest('button[data-action]');
              if (!btn) return;
              const action = btn.dataset.action;
              const id = parseInt(btn.dataset.id);
              const user = userDataRef.current.find(u => u.id == id);
              if (action === 'delete') handleDelete(id);
              if (action === 'edit' && user) handleEdit(user);
            }}>
              <DataTable
                data={userData}
                columns={columns}
                className="table table-striped table-hover w-100"
                options={{
                  paging: true,
                  searching: true,
                  ordering: true,
                  pageLength: 10,
                  responsive: true,
                }}
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Actions</th>
                  </tr>
                </thead>
              </DataTable>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}

export default User;