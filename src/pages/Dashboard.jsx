import React, { useState, useEffect } from 'react';
import axiosClient from '../../services/axiosClient';

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axiosClient.get("retrieve.php?action=count_users");
        if (response.data.status === 'success') {
          setTotalUsers(response.data.total_users);
        }
      } catch (error) {
        console.error('Error fetching user count:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <>
      <div className="container mt-5" style={{marginLeft: '500px'}}>
        <h4 className="text-uppercase mb-4">Dashboard</h4>
        <div className="row">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="bg-success bg-opacity-10 p-3 rounded">
                  <i className="bi bi-people-fill fs-3 text-success"></i>
                </div>
                <div>
                  <p className="text-muted text-uppercase mb-1" style={{ fontSize: '0.75rem' }}>Total Users</p>
                  {isLoading ? (
                    <div className="spinner-border spinner-border-sm text-success" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <h3 className="fw-bold mb-0">{totalUsers}</h3>
                  )}
                </div>
              </div>
              <div className="card-footer bg-transparent border-0 text-muted" style={{ fontSize: '0.75rem' }}>
                <i className="bi bi-arrow-up-short text-success"></i> Registered accounts
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;