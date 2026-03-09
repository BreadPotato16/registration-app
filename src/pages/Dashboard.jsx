import React, { useState, } from 'react';
import axiosClient from '../../services/axiosClient';


function Dashboard() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState('success'); 
  const [isLoading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlertMsg(''); 
    try {
      const response = await axiosClient.post("registration.php", {
        username,
        password,
      });

      if (response.data.status === 'success') {
        setAlertType('success'); 
        setAlertMsg(response.data.message);
      } else {
        setAlertType('danger'); 
        setAlertMsg(response.data.message); 
      }

    } catch (error) {
      console.error('Error during registration:', error);
      setAlertType('danger'); 
      setAlertMsg('Something went wrong. Please try again.'); 
    } finally {
      setLoading(false);
    }

  }
  return (
    <>
      <div className='container text-center' style={{ margin: 0, padding: 0, maxWidth: '100%' }}>
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <div className="card mt-5">
              <div className="card-body" style={{ borderRadius: '0', marginBottom: '-0.5rem' }}>
                <h5 className="card-title mb-4 mt-4 text-uppercase text-center">Registration Form</h5>
                <p className='card-text' style={{ color: 'gray' }}>quick and easy</p>
              </div>
            </div>
            <div className='card'>
              <div className='card-body' style={{ borderRadius: '0', marginTop: '1rem' }}>
                <form onSubmit={handleRegister}>
                  <div className="form-floating mb-3 mt-3">
                    <input type="text" className="form-control" name='username' placeholder="name@example.com" required onChange={(e) => setUsername(e.target.value)} />
                    <label htmlFor="floatingInput">Username</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="password" className="form-control" name='password' placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>

                  <button type="submit" className="btn btn-success text-center" disabled={isLoading}>
                    {isLoading ? (
                      <div className='flex gap-3 align-items-center'>
                        <div className="spinner-border spinner-border-sm" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        Registering...
                      </div>
                    ) : 'Register'}
                  </button>

                </form>

              </div>
            </div>

            {alertMessage && <div className={`alert alert-${alertType} mt-3`} role="alert">{alertMessage}</div>}


          </div>
          <div className="col"></div>
        </div>
      </div>
    </>
  );

}
export default Dashboard