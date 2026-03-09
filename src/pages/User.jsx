import React, { useState, useEffect } from 'react';
import axiosClient from '../../services/axiosClient';

function User() {

    const [userData, setUserData] = useState([]);
    const [alertMessage, setAlertMsg] = useState('');
    const [editUser, setEditUser] = useState(null); 
  

  const fetchUserData = async () => {
    try {
      const response = await axiosClient.get("retrieve.php");
      if (response.data.status === 'success') {
        setUserData(response.data.data);
      }

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  const handleDelete = async (id) => {
    if(confirm('Are you sure you want to delete this user?') == false) return;
    try {
      const response = await axiosClient.delete('delete.php', { data: { id } });
      if (response.data.status === 'success') {
        setAlertMsg(response.data.message);
        setUserData(prev => prev.filter(user => user.id !== id)); // still keep this
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  const handleEdit = (user) => {
    setEditUser({ ...user });
  }

  const handleUpdate = async () => {
    try {
      const response = await axiosClient.put('update.php', editUser);
      if (response.data.status === 'success') {
        setAlertMsg(response.data.message);
        setEditUser(null);
        await fetchUserData();
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }


  useEffect(() => {
    fetchUserData();
  }, []);

     return (
    <>
     <div className='container text-center' style={{ margin: 0, padding: 0, maxWidth: '100%'}}>
        <div className="row">
          <div className="col"></div>
          <div className="col">

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
                      <input type="text" className="form-control" placeholder="Username" value={editUser.username} onChange={(e) => setEditUser({ ...editUser, username: e.target.value })} />
                      <label>Username</label>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={() => setEditUser(null)}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleUpdate}>Save Changes</button>
                  </div>
                </div>
              </div>
            </div>
          )}

                 <div className="table-responsive mt-5" style={{ maxWidth: "600px" }}>
            {alertMessage && <div className="alert alert-warning mt-3" role="alert">{alertMessage}</div>}
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Actions</th> 
                  </tr>
                </thead>
                <tbody>
                  {
                    userData && userData.length > 0 ? (
                      userData.map((user) => {
                        return (
                          <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td className='d-flex gap-2'> 
                              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>Delete</button>
                              <button className="btn btn-warning btn-sm" onClick={() => handleEdit(user)}>Edit</button> 
                            </td>
                          </tr>
                        )
                      })
                    )
                      : (
                        <tr>
                          <td colSpan="4" className="text-center">No user data available</td> 
                        </tr>
                      )
                  }
                </tbody>
              </table>
            </div>
            </div>
          <div className="col"></div>
        </div>
      </div>
     

    </>
  );

}
export default User