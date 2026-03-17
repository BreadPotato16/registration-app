import React, { useState } from 'react';
import axiosClient from '../../services/axiosClient';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosClient.post("registration.php", {
                username,
                password,
            });

            const isSuccess = response.data.status === 'success';

            MySwal.fire({
                title: isSuccess ? 'Registration Successful' : 'Registration Failed',
                text: response.data.message,
                icon: isSuccess ? 'success' : 'error',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed && isSuccess) {
                    window.location.reload();
                }
            });

        } catch (error) {
            console.error('Error during registration:', error);
            MySwal.fire({
                title: 'Unexpected Error',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">
            <div className="col-12 col-sm-8 col-md-5 col-lg-4">

                <div className="text-center mb-4">
                    <h4 className="fw-bold text-uppercase text-dark" style={{ letterSpacing: '3px' }}>
                        Register
                    </h4>
                    <p className="text-secondary mb-0" style={{ fontSize: '0.85rem' }}>Create a new account</p>
                </div>

                <div className="card border-0 shadow-sm">
                    <div className="card-body p-4">

                        <form onSubmit={handleRegister}>

                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control bg-light border-0 border-bottom rounded-0"
                                    name="username"
                                    placeholder="Username"
                                    required
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <label className="text-secondary">Username</label>
                            </div>

                            <div className="input-group mb-4">
                                <div className="form-floating flex-grow-1">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control bg-light border-0 border-bottom rounded-0"
                                        name="password"
                                        placeholder="Password"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <label className="text-secondary">Password</label>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary rounded-0 border-0 border-bottom"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>

                            <div className="d-grid">
                                <button
                                    type="submit"
                                    className="btn btn-dark text-uppercase fw-semibold rounded-0"
                                    style={{ letterSpacing: '2px' }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="d-flex align-items-center justify-content-center gap-2">
                                            <span className="spinner-border spinner-border-sm" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </span>
                                            Registering...
                                        </span>
                                    ) : 'Register'}
                                </button>
                            </div>

                        </form>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Register;